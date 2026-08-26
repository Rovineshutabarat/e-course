package com.lerneon.backend.services.implementations;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.lerneon.backend.models.entity.TranscodeEvent;
import com.lerneon.backend.models.entity.TranscodeProfileBuilder;
import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.enums.VideoResolution;
import com.lerneon.backend.models.exceptions.TranscodeException;
import com.lerneon.backend.models.properties.UploadProperties;
import com.lerneon.backend.services.TranscodeService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class TranscodeServiceImpl implements TranscodeService {
    private final UploadProperties uploadProperties;

    private static final String AUDIO_CODEC = "aac";
    private static final String VIDEO_CODEC = "libx264";
    private static final String PIXEL_FORMAT = "yuv420p";
    private static final String HLS_PLAYLIST_TYPE = "vod";
    private static final String HLS_SEGMENT_TYPE = "mpegts";
    private static final String HLS_TIME = "6";
    private static final String SEGMENT_FILENAME = "data%03d.ts";
    private static final String PLAYLIST_FILENAME = "playlist.m3u8";

    private static final String MASTER_FILENAME = "master.m3u8";

    private static final String LOW_RES_DIRECTORY = "stream_360p";
    private static final String MEDIUM_RES_DIRECTORY = "stream_480p";
    private static final String HIGH_RES_DIRECTORY = "stream_720p";

    @Override
    public TranscodeStatus transcode(TranscodeEvent transcodeEvent) {
        String destination = getDestination(transcodeEvent);

        log.info("Starting transcode | resolution={} destination={}",
                transcodeEvent.getVideoResolution(), destination);

        try {
            Files.createDirectories(Paths.get(destination));
            String[] commands = buildCommand(transcodeEvent);

            log.debug("FFmpeg command: {}", String.join(" ", commands));

            ProcessBuilder processBuilder = new ProcessBuilder(commands);
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();

            StringBuilder outputBuilder = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    log.debug("[ffmpeg] {}", line);
                    outputBuilder.append(line).append(System.lineSeparator());
                }
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                log.error("FFmpeg failed | exitCode={} destination={}\nOutput: {}",
                        exitCode, destination, outputBuilder);
                return TranscodeStatus.FAILED;
            }

            log.info("Transcode completed | destination={}", destination);
            return TranscodeStatus.COMPLETE;

        } catch (Exception exception) {
            log.error("Failed to transcode video | destination={}", destination, exception);
            return TranscodeStatus.FAILED;
        }
    }

    private String[] buildCommand(TranscodeEvent transcodeEvent) {
        TranscodeProfileBuilder profile = buildProfile(transcodeEvent.getVideoResolution());

        List<List<String>> argGroups = List.of(
                inputArgs(transcodeEvent.getSource()),
                streamMappingArgs(),
                videoArgs(profile),
                audioArgs(profile),
                hlsArgs(getDestination(transcodeEvent)));

        List<String> command = new ArrayList<>();
        command.add(uploadProperties.getFfmpegDirectory());
        argGroups.forEach(command::addAll);

        return command.toArray(new String[0]);
    }

    private TranscodeProfileBuilder buildProfile(VideoResolution videoResolution) {
        return switch (videoResolution) {
            case LOW -> TranscodeProfileBuilder.builder()
                    .scale("scale=-2:360")
                    .preset("veryfast")
                    .crf("28")
                    .maxrate("800k")
                    .bufsize("1600k")
                    .profile("baseline") // baseline | main | high
                    .tune("fastdecode")
                    .audioBitRate("96k")
                    .build();
            case MEDIUM -> TranscodeProfileBuilder.builder()
                    .scale("scale=-2:480")
                    .preset("fast")
                    .crf("26")
                    .maxrate("1400k")
                    .bufsize("2800k")
                    .profile("main") // baseline | main | high
                    .tune("fastdecode")
                    .audioBitRate("128k")
                    .build();
            case HIGH -> TranscodeProfileBuilder.builder()
                    .scale("scale=-2:720")
                    .preset("fast")
                    .crf("23")
                    .maxrate("2800k")
                    .bufsize("5600k")
                    .profile("high") // baseline | main | high
                    .tune("fastdecode")
                    .audioBitRate("160k")
                    .build();
        };
    }

    private String getDestination(TranscodeEvent transcodeEvent) {
        return switch (transcodeEvent.getVideoResolution()) {
            case LOW -> transcodeEvent.getDestination().concat("/").concat(LOW_RES_DIRECTORY);
            case MEDIUM -> transcodeEvent.getDestination().concat("/").concat(MEDIUM_RES_DIRECTORY);
            case HIGH -> transcodeEvent.getDestination().concat("/").concat(HIGH_RES_DIRECTORY);
        };
    }

    private List<String> inputArgs(String source) {
        return new ArrayList<>(List.of(
                "-progress", "pipe:1",
                "-nostats",
                "-i", source));
    }

    private List<String> streamMappingArgs() {
        return new ArrayList<>(List.of(
                "-map", "0:v:0",
                "-map", "0:a:0",
                "-sn",
                "-dn"));
    }

    private List<String> videoArgs(TranscodeProfileBuilder profile) {
        List<String> args = new ArrayList<>(List.of(
                "-vf", profile.getScale() + "," + "pad=ceil(iw/2)*2:ceil(ih/2)*2",
                "-pix_fmt", PIXEL_FORMAT,
                "-c:v", VIDEO_CODEC,
                "-preset", profile.getPreset()));

        if (profile.getTune() != null) {
            args.add("-tune");
            args.add(profile.getTune());
        }

        args.addAll(List.of(
                "-crf", profile.getCrf(),
                "-maxrate", profile.getMaxrate(),
                "-bufsize", profile.getBufsize(),
                "-profile:v", profile.getProfile()));

        args.add("-force_key_frames");
        args.add("expr:gte(t,n_forced*" + HLS_TIME + ")");

        return args;
    }

    private List<String> audioArgs(TranscodeProfileBuilder profile) {
        return new ArrayList<>(List.of(
                "-c:a", AUDIO_CODEC,
                "-b:a", profile.getAudioBitRate(),
                "-ac", "2"));
    }

    private List<String> hlsArgs(String outputDir) {
        return new ArrayList<>(List.of(
                "-f", "hls",
                "-hls_time", HLS_TIME,
                "-hls_playlist_type", HLS_PLAYLIST_TYPE,
                "-hls_list_size", "0",
                "-hls_segment_type", HLS_SEGMENT_TYPE,
                "-hls_flags", "independent_segments",
                "-hls_segment_filename", outputDir + "/" + SEGMENT_FILENAME,
                outputDir + "/" + PLAYLIST_FILENAME));
    }

    @Override
    public synchronized String createMasterPlaylist(TranscodeEvent transcodeEvent) {
        try {
            Path path = Paths.get(transcodeEvent.getDestination(), MASTER_FILENAME);
            String existing = Files.exists(path) ? Files.readString(path) : "";

            if (existing.contains(resolveMasterPlaylistContent(transcodeEvent.getVideoResolution())))
                return path.toString();

            String updated = existing.isBlank()
                    ? "#EXTM3U\n#EXT-X-VERSION:3\n\n"
                            + resolveMasterPlaylistContent(transcodeEvent.getVideoResolution())
                    : existing + "\n" + resolveMasterPlaylistContent(transcodeEvent.getVideoResolution());

            Files.writeString(path, updated, StandardCharsets.UTF_8);
            return path.toString();

        } catch (Exception ex) {
            throw new TranscodeException(
                    "Failed to update master playlist at '" + transcodeEvent.getDestination() + "': "
                            + ex.getMessage());
        }
    }

    private String resolveMasterPlaylistContent(VideoResolution videoResolution) {
        return switch (videoResolution) {
            case LOW -> "#EXT-X-STREAM-INF:BANDWIDTH=856000,AVERAGE-BANDWIDTH=700000,"
                    + "RESOLUTION=640x360,CODECS=\"avc1.42E01E,mp4a.40.2\"\n" + LOW_RES_DIRECTORY + "/"
                    + PLAYLIST_FILENAME + "\n";
            case MEDIUM -> "#EXT-X-STREAM-INF:BANDWIDTH=1498000,AVERAGE-BANDWIDTH=1200000,"
                    + "RESOLUTION=854x480,CODECS=\"avc1.4D401F,mp4a.40.2\"\n" + MEDIUM_RES_DIRECTORY + "/"
                    + PLAYLIST_FILENAME + "\n";
            case HIGH -> "#EXT-X-STREAM-INF:BANDWIDTH=2996000,AVERAGE-BANDWIDTH=2400000,"
                    + "RESOLUTION=1280x720,CODECS=\"avc1.4D401F,mp4a.40.2\"\n" + HIGH_RES_DIRECTORY + "/"
                    + PLAYLIST_FILENAME + "\n";
            default -> throw new IllegalArgumentException("Unsupported video resolution: " + videoResolution);
        };
    }
}
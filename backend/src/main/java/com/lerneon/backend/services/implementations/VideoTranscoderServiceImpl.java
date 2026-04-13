package com.lerneon.backend.services.implementations;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.springframework.stereotype.Service;
import com.lerneon.backend.jobs.payload.VideoTranscoderPayload;
import com.lerneon.backend.models.exceptions.TranscoderException;
import com.lerneon.backend.models.properties.UploadProperties;
import com.lerneon.backend.services.VideoTranscoderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class VideoTranscoderServiceImpl implements VideoTranscoderService {
    private final UploadProperties uploadProperties;
    private static final String AUDIO_CODEC = "aac";
    private static final String VIDEO_CODEC = "libx264";
    private static final String HLS_TIME = "4";

    @Override
    public String transcode(VideoTranscoderPayload videoTranscoderPayload, String[] commands) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder(commands);
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();

            ArrayDeque<String> lastLines = new ArrayDeque<>(50);
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    log.info("[FFmpeg] {}", line);
                    if (lastLines.size() >= 50)
                        lastLines.poll();
                    lastLines.add(line);
                }
            }



            boolean finished = process.waitFor(videoTranscoderPayload.getResolution().getTimeout(),
                    TimeUnit.MINUTES);

            if (!finished) {
                process.destroyForcibly();
                throw new TranscoderException(
                        "FFmpeg timeout for " + videoTranscoderPayload.getResolution());
            }
            int exitCode = process.exitValue();
            if (exitCode != 0) {
                throw new TranscoderException(
                        "FFmpeg exit code: " + exitCode + "\n" + String.join("\n", lastLines));
            }
            return createMasterPlaylist(videoTranscoderPayload.getOutputDirectory());
        } catch (TranscoderException exception) {
            throw exception;

        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            throw new TranscoderException("FFmpeg interrupted: " + exception.getMessage());

        } catch (IOException exception) {
            throw new TranscoderException("FFmpeg IO error: " + exception.getMessage());

        } catch (Exception exception) {
            throw new TranscoderException("Unexpected error: " + exception.getMessage());
        }
    }

    private String[] buildTranscoderCommand(String source, String streamPath, String scale,
            String pad, String preset, String tune, String crf, String maxrate, String bufsize,
            String profile, String bfFrames, String audioKbps, String threads) {

        List<String> command = new ArrayList<>();

        command.add(uploadProperties.getFfmpegDirectory());
        command.add("-i");
        command.add(source);
        command.add("-map");
        command.add("0:v:0");
        command.add("-map");
        command.add("0:a:0");
        command.add("-sn");
        command.add("-dn");

        command.add("-vf");
        command.add(scale + "," + pad);
        command.add("-pix_fmt");
        command.add("yuv420p");

        command.add("-c:v");
        command.add(VIDEO_CODEC);
        command.add("-preset");
        command.add(preset);
        if (tune != null) {
            command.add("-tune");
            command.add(tune);
        }
        command.add("-crf");
        command.add(crf);
        command.add("-maxrate");
        command.add(maxrate);
        command.add("-bufsize");
        command.add(bufsize);
        command.add("-profile:v");
        command.add(profile);
        if (bfFrames != null) {
            command.add("-bf");
            command.add(bfFrames);
        }
        command.add("-force_key_frames");
        command.add("expr:gte(t,n_forced*" + HLS_TIME + ")");
        command.add("-threads");
        command.add(threads);

        command.add("-c:a");
        command.add(AUDIO_CODEC);
        command.add("-b:a");
        command.add(audioKbps);
        command.add("-ac");
        command.add("2");

        command.add("-f");
        command.add("hls");
        command.add("-hls_time");
        command.add(HLS_TIME);
        command.add("-hls_playlist_type");
        command.add("vod");
        command.add("-hls_list_size");
        command.add("0");
        command.add("-hls_segment_type");
        command.add("mpegts");
        command.add("-hls_flags");
        command.add("independent_segments");
        command.add("-hls_segment_filename");
        command.add(streamPath + "/data%03d.ts");
        command.add(streamPath + "/playlist.m3u8");

        return command.toArray(new String[0]);
    }

    @Override
    public String transcode360p(VideoTranscoderPayload videoTranscoderPayload) {
        String streamPath =
                Path.of(videoTranscoderPayload.getOutputDirectory(), "stream_360p").toString();
        createStreamDirectory(streamPath);
        String[] command = buildTranscoderCommand(videoTranscoderPayload.getSource(), streamPath,
                "scale=640:360:force_original_aspect_ratio=decrease",
                "pad=640:360:(ow-iw)/2:(oh-ih)/2:color=black", "superfast", "fastdecode", "23",
                "856k", "1712k", "baseline", null, "96k", "2");
        return transcode(videoTranscoderPayload, command);
    }

    @Override
    public String transcode480p(VideoTranscoderPayload videoTranscoderPayload) {
        String streamPath =
                Path.of(videoTranscoderPayload.getOutputDirectory(), "stream_480p").toString();
        createStreamDirectory(streamPath);
        String[] command = buildTranscoderCommand(videoTranscoderPayload.getSource(), streamPath,
                "scale=854:480:force_original_aspect_ratio=decrease",
                "pad=854:480:(ow-iw)/2:(oh-ih)/2:color=black", "fast", "fastdecode", "23", "1498k",
                "2996k", "main", "3", "128k", "3");
        return transcode(videoTranscoderPayload, command);
    }

    @Override
    public String transcode720p(VideoTranscoderPayload videoTranscoderPayload) {
        String streamPath =
                Path.of(videoTranscoderPayload.getOutputDirectory(), "stream_720p").toString();
        createStreamDirectory(streamPath);
        String[] command = buildTranscoderCommand(videoTranscoderPayload.getSource(), streamPath,
                "scale=1280:720:force_original_aspect_ratio=decrease",
                "pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=black", "medium", null, "22", "2996k",
                "5992k", "main", "3", "128k", "4");
        return transcode(videoTranscoderPayload, command);
    }

    @Override
    public String createMasterPlaylist(String outputDir) {
        try {
            // avc1.42E01E = H.264 Baseline (360p)
            // avc1.4D401F = H.264 Main (480p, 720p)
            // mp4a.40.2 = AAC-LC
            String content = "#EXTM3U\n" + "#EXT-X-VERSION:3\n" + "\n" + "# 360p\n"
                    + "#EXT-X-STREAM-INF:BANDWIDTH=856000,AVERAGE-BANDWIDTH=700000,"
                    + "RESOLUTION=640x360,CODECS=\"avc1.42E01E,mp4a.40.2\"\n"
                    + "stream_360p/playlist.m3u8\n" + "\n" + "# 480p\n"
                    + "#EXT-X-STREAM-INF:BANDWIDTH=1498000,AVERAGE-BANDWIDTH=1200000,"
                    + "RESOLUTION=854x480,CODECS=\"avc1.4D401F,mp4a.40.2\"\n"
                    + "stream_480p/playlist.m3u8\n" + "\n" + "# 720p\n"
                    + "#EXT-X-STREAM-INF:BANDWIDTH=2996000,AVERAGE-BANDWIDTH=2400000,"
                    + "RESOLUTION=1280x720,CODECS=\"avc1.4D401F,mp4a.40.2\"\n"
                    + "stream_720p/playlist.m3u8\n";

            Path path = Paths.get(outputDir, "master.m3u8");
            Files.write(path, content.getBytes(StandardCharsets.UTF_8));

            return path.toString();
        } catch (Exception exception) {
            throw new TranscoderException(
                    "Failed to generate master playlist: " + exception.getMessage());
        }
    }

    @Override
    public void createStreamDirectory(String path) {
        try {
            Files.createDirectories(Paths.get(path));
        } catch (IOException exception) {
            throw new TranscoderException("Failed to create directory: " + path);
        }
    }
}

package com.lerneon.backend.services.implementations;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.channels.FileChannel;
import java.nio.channels.FileLock;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.lerneon.backend.models.entity.TranscodeLog;
import com.lerneon.backend.models.entity.TranscodeProfileBuilder;
import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.enums.VideoResolution;
import com.lerneon.backend.models.event.TranscodeEvent;
import com.lerneon.backend.models.exceptions.TranscodeException;
import com.lerneon.backend.models.exceptions.TranscodeFatalException;
import com.lerneon.backend.models.exceptions.TranscodeRetryableException;
import com.lerneon.backend.models.properties.UploadProperties;
import com.lerneon.backend.services.TranscodeLogService;
import com.lerneon.backend.services.TranscodeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TranscodeServiceImpl implements TranscodeService {
    private final UploadProperties uploadProperties;
    private final TranscodeLogService transcodeLogService;

    private static final String AUDIO_CODEC = "aac";
    private static final String VIDEO_CODEC = "libx264";
    private static final String PIXEL_FORMAT = "yuv420p";
    private static final String HLS_PLAYLIST_TYPE = "vod";
    private static final String HLS_SEGMENT_TYPE = "mpegts";
    private static final String HLS_TIME = "6";
    private static final String SEGMENT_FILENAME = "data%03d.ts";
    private static final String PLAYLIST_FILENAME = "playlist.m3u8";
    private static final String PROGRESS_PREFIX = "out_time_us=";

    private static final String MASTER_FILENAME = "master.m3u8";
    private static final String MASTER_LOCK_FILENAME = "master.m3u8.lock";

    private static final String LOW_RES_DIRECTORY = "stream_360p";
    private static final String MEDIUM_RES_DIRECTORY = "stream_480p";
    private static final String HIGH_RES_DIRECTORY = "stream_720p";

    private final Map<Integer, SseEmitter> emitters = new ConcurrentHashMap<>();

    @Override
    public String getDestination(TranscodeEvent transcodeEvent) {
        return switch (transcodeEvent.getVideoResolution()) {
            case LOW -> transcodeEvent.getDestination().concat("/").concat(LOW_RES_DIRECTORY);
            case MEDIUM -> transcodeEvent.getDestination().concat("/").concat(MEDIUM_RES_DIRECTORY);
            case HIGH -> transcodeEvent.getDestination().concat("/").concat(HIGH_RES_DIRECTORY);
        };
    }

    @Override
    public TranscodeStatus transcode(TranscodeEvent transcodeEvent) {
        Long videoDuration = getVideoDuration(transcodeEvent.getSource());

        log.info("Starting transcode | resolution={} destination={}",
                transcodeEvent.getVideoResolution(), transcodeEvent.getDestination());
        createDirectory(getDestination(transcodeEvent));

        Process process = startFfmpegProcess(transcodeEvent);
        Thread shutdownHook = registerShutdownHook(process);
        try {
            String output = readFFmpegOutput(process, transcodeEvent, videoDuration);
            int exitCode = waitForFfmpegExit(process);

            handleExitCode(exitCode, transcodeEvent, output);

            log.info("Transcode completed | resolution={} destination={}",
                    transcodeEvent.getVideoResolution(), transcodeEvent.getDestination());

            // force complete sse
            emitProgress(transcodeEvent.getTranscodeLogId(), 100, true);

            return TranscodeStatus.COMPLETE;
        } finally {
            removeShutdownHook(shutdownHook);
        }
    }

    @Override
    public String createMasterPlaylist(TranscodeEvent transcodeEvent) {
        Path path = Paths.get(transcodeEvent.getDestination(), MASTER_FILENAME);
        Path lockPath = Paths.get(transcodeEvent.getDestination(), MASTER_LOCK_FILENAME);

        try {
            Files.createDirectories(path.getParent());

            try (FileChannel lockChannel = FileChannel.open(
                    lockPath, StandardOpenOption.CREATE, StandardOpenOption.WRITE)) {

                FileLock lock = lockChannel.lock(); // blocking, lintas proses di filesystem yang sama
                try {
                    String existing = Files.exists(path) ? Files.readString(path) : "";
                    String entry = resolveMasterPlaylistEntry(transcodeEvent.getVideoResolution());

                    if (existing.contains(entry)) {
                        return path.toString();
                    }

                    String updated = existing.isBlank()
                            ? "#EXTM3U\n#EXT-X-VERSION:3\n\n" + entry
                            : existing + "\n" + entry;

                    Files.writeString(path, updated, StandardCharsets.UTF_8);
                    return path.toString();
                } finally {
                    lock.release();
                }
            }
        } catch (Exception ex) {
            throw new TranscodeException(
                    "Failed to update master playlist at '" + transcodeEvent.getDestination() + "': "
                            + ex.getMessage());
        }
    }

    private String resolveMasterPlaylistEntry(VideoResolution videoResolution) {
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

    @Override
    public void registerEmitter(Integer transcodeLogId, SseEmitter emitter) {
        TranscodeLog transcodeLog = transcodeLogService.getTranscodeLogById(transcodeLogId);

        if (transcodeLog.getTranscodeStatus().equals(TranscodeStatus.COMPLETE)) {
            emitter.complete();
            return;
        }

        if (transcodeLog.getTranscodeStatus().equals(TranscodeStatus.FAILED)) {
            emitter.completeWithError(new TranscodeException("Transcode failed"));
            return;
        }

        emitters.put(transcodeLogId, emitter);

        emitter.onCompletion(() -> emitters.remove(transcodeLogId));
        emitter.onTimeout(() -> emitters.remove(transcodeLogId));
    }

    @Override
    public void failEmitter(Integer transcodeLogId) {
        if (transcodeLogId == null) {
            return;
        }
        SseEmitter emitter = emitters.remove(transcodeLogId);
        if (emitter == null) {
            return;
        }
        try {
            emitter.completeWithError(new TranscodeException("Transcode failed"));
        } catch (Exception e) {
            log.debug("Emitter for transcodeLogId={} already closed", transcodeLogId);
        }
    }

    private void parseFFmpegProgress(String line, TranscodeEvent transcodeEvent, Long videoDuration) {
        String value = line.substring(PROGRESS_PREFIX.length()).trim();
        if (value.equals("N/A") || value.isEmpty() || videoDuration == null || videoDuration <= 0) {
            return;
        }
        try {
            long outTimeUs = Long.parseLong(value);
            double currentSeconds = outTimeUs / 1_000_000.0;
            int percentage = Math.min(99, (int) Math.round((currentSeconds / videoDuration) * 100));
            emitProgress(transcodeEvent.getTranscodeLogId(), percentage, false);
        } catch (NumberFormatException ex) {
            log.warn("Failed to read FFmpeg Progress");
        }
    }

    private void emitProgress(Integer transcodeLogId, int percentage, boolean forceComplete) {
        SseEmitter emitter = emitters.get(transcodeLogId);
        if (emitter == null)
            return;
        try {
            emitter.send(SseEmitter.event().data(percentage));
            if (forceComplete || percentage >= 100) {
                emitter.complete();
                emitters.remove(transcodeLogId);
            }
        } catch (IOException e) {
            emitters.remove(transcodeLogId);
        }
    }

    private Long getVideoDuration(String source) {
        try {
            ProcessBuilder pb = new ProcessBuilder(
                    "ffprobe",
                    "-v", "error",
                    "-show_entries", "format=duration",
                    "-of", "default=noprint_wrappers=1:nokey=1",
                    source);

            Process process = pb.start();
            String output = new String(process.getInputStream().readAllBytes()).trim();
            process.waitFor();

            return Math.round(Double.parseDouble(output));

        } catch (Exception exception) {
            log.error(
                    "Failed to get video duration | source={}",
                    source,
                    exception);
            return 0L;
        }
    }

    private void createDirectory(String path) {
        try {
            Files.createDirectories(Paths.get(path));
        } catch (IOException exception) {
            log.warn("Failed to create transcode directory");
            throw new TranscodeRetryableException("Failed to create transcode directory");
        }
    }

    private Process startFfmpegProcess(TranscodeEvent transcodeEvent) {
        try {
            String[] commands = buildCommand(transcodeEvent);
            ProcessBuilder processBuilder = new ProcessBuilder(commands);
            processBuilder.redirectErrorStream(true);
            return processBuilder.start();
        } catch (IOException e) {
            throw new TranscodeRetryableException("Failed to start FFmpeg: " + e.getMessage());
        }
    }

    private Thread registerShutdownHook(Process process) {
        Thread hook = new Thread(() -> {
            if (process.isAlive()) {
                log.warn("Terminating FFmpeg process pid={}", process.pid());
                process.destroy();
                try {
                    if (!process.waitFor(5, TimeUnit.SECONDS)) {
                        log.warn("FFmpeg pid={} unresponsive, forcing kill", process.pid());
                        process.destroyForcibly();
                    }
                } catch (InterruptedException e) {
                    process.destroyForcibly();
                }
            }
        });
        Runtime.getRuntime().addShutdownHook(hook);
        return hook;
    }

    private void removeShutdownHook(Thread hook) {
        try {
            Runtime.getRuntime().removeShutdownHook(hook);
        } catch (IllegalStateException e) {
            // JVM sedang shutdown, hook memang akan/sudah jalan — aman diabaikan
        }
    }

    private String readFFmpegOutput(Process process, TranscodeEvent transcodeEvent, Long videoDuration) {
        StringBuilder outputBuilder = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.startsWith(PROGRESS_PREFIX)) {
                    parseFFmpegProgress(line, transcodeEvent, videoDuration);
                }
                log.debug("[ffmpeg] {}", line);
                outputBuilder.append(line).append(System.lineSeparator());
            }
        } catch (IOException e) {
            throw new TranscodeRetryableException("FFmpeg Stream Disconnected: " + e.getMessage());
        }
        return outputBuilder.toString();
    }

    private int waitForFfmpegExit(Process process) {
        try {
            return process.waitFor();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new TranscodeRetryableException("FFmpeg process interrupted");
        }
    }

    private void handleExitCode(int exitCode, TranscodeEvent transcodeEvent, String output) {
        if (exitCode == 0) {
            return;
        }

        log.error("FFmpeg failed | exitCode={} resolution={} destination={}\nOutput: {}",
                exitCode, transcodeEvent.getVideoResolution(), transcodeEvent.getDestination(), output);

        if (exitCode == 137) { // OOM
            throw new TranscodeRetryableException("FFmpeg di-kill (kemungkinan OOM), exitCode=" + exitCode);
        }
        throw new TranscodeFatalException("FFmpeg failed with exitCode=" + exitCode + ": " + output);
    }

    private String[] buildCommand(TranscodeEvent transcodeEvent) {
        TranscodeProfileBuilder profile = buildProfile(transcodeEvent.getVideoResolution());

        List<List<String>> args = List.of(
                inputArgs(transcodeEvent.getSource()),
                streamMappingArgs(),
                videoArgs(profile),
                audioArgs(profile),
                hlsArgs(getDestination(transcodeEvent)));

        List<String> command = new ArrayList<>();
        command.add(uploadProperties.getFfmpegDirectory());
        args.forEach(command::addAll);

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

}
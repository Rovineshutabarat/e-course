package com.lerneon.backend.services.implementations;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

import com.lerneon.backend.jobs.payload.VideoTranscoderPayload;
import com.lerneon.backend.models.entity.VideoTranscoderJob;
import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.exceptions.TranscoderException;
import com.lerneon.backend.models.properties.UploadProperties;
import com.lerneon.backend.repositories.VideoTranscoderJobRepository;
import com.lerneon.backend.services.ResourceService;
import com.lerneon.backend.services.VideoTranscoderService;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;

// update jobs code
// add websocket to track progress
// update frontend course builder
// use chunk upload

@Service
@AllArgsConstructor
@Slf4j
public class VideoTranscoderServiceImpl implements VideoTranscoderService {

    private final UploadProperties uploadProperties;
    // Message
    private final VideoTranscoderJobRepository videoTranscoderJobRepository;
    private final ResourceService resourceService;

    private static final String AUDIO_CODEC = "aac";
    private static final String VIDEO_CODEC = "libx264";
    private static final String HLS_TIME = "6";
    private static final String SEGMENT_FILENAME = "data%03d.ts";
    private static final String PLAYLIST_FILENAME = "playlist.m3u8";
    private static final String MASTER_FILENAME = "master.m3u8";

    private static final String DIR_360P = "stream_360p";
    private static final String DIR_480P = "stream_480p";
    private static final String DIR_720P = "stream_720p";
    private static final int PROGRESS_LOG_STEP = 1;

    private static final java.util.Map<String, Integer> PROGRESS_LINES = java.util.Map.of("360P", 1, "480P", 2, "720P",
            3);

    @Builder
    private record TranscodeProfile(String scale, String pad, String preset, String tune,
            String crf, String maxrate, String bufsize, String profile, String bfFrames,
            String audioKbps, String threads) {
    }

    // private static final TranscodeProfile PROFILE_360P =
    // TranscodeProfile.builder().scale("scale=640:360:force_original_aspect_ratio=decrease")
    // .pad("pad=640:360:(ow-iw)/2:(oh-ih)/2:color=black").preset("superfast")
    // .tune("fastdecode").crf("23").maxrate("856k").bufsize("1712k")
    // .profile("baseline").bfFrames(null).audioKbps("96k").threads(THREADS_360P).build();

    // private static final TranscodeProfile PROFILE_480P =
    // TranscodeProfile.builder().scale("scale=854:480:force_original_aspect_ratio=decrease")
    // .pad("pad=854:480:(ow-iw)/2:(oh-ih)/2:color=black").preset("fast")
    // .tune("fastdecode").crf("23").maxrate("1498k").bufsize("2996k").profile("main")
    // .bfFrames("3").audioKbps("128k").threads(THREADS_480P).build();

    // private static final TranscodeProfile PROFILE_720P =
    // TranscodeProfile.builder().scale("scale=1280:720:force_original_aspect_ratio=decrease")
    // .pad("pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=black").preset("medium").tune(null)
    // .crf("22").maxrate("2996k").bufsize("5992k").profile("main").bfFrames("3")
    // .audioKbps("128k").threads(THREADS_720P).build();

    private static final TranscodeProfile PROFILE_360P = TranscodeProfile.builder()
            .scale("scale=640:360:force_original_aspect_ratio=decrease")
            .pad("pad=640:360:(ow-iw)/2:(oh-ih)/2:color=black").preset("ultrafast")
            .tune("fastdecode").crf("28").maxrate("700k").bufsize("1400k").profile("baseline")
            .bfFrames(null).audioKbps("64k").build();

    private static final TranscodeProfile PROFILE_480P = TranscodeProfile.builder()
            .scale("scale=854:480:force_original_aspect_ratio=decrease")
            .pad("pad=854:480:(ow-iw)/2:(oh-ih)/2:color=black").preset("ultrafast")
            .tune("fastdecode").crf("26").maxrate("1200k").bufsize("2400k").profile("baseline")
            .bfFrames(null).audioKbps("96k").build();

    private static final TranscodeProfile PROFILE_720P = TranscodeProfile.builder()
            .scale("scale=1280:720:force_original_aspect_ratio=decrease")
            .pad("pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=black").preset("fast").tune("fastdecode")
            .crf("24").maxrate("2500k").bufsize("5000k").profile("baseline").bfFrames(null)
            .audioKbps("128k").build();

    private static final String MASTER_ENTRY_360P = "#EXT-X-STREAM-INF:BANDWIDTH=856000,AVERAGE-BANDWIDTH=700000,"
            + "RESOLUTION=640x360,CODECS=\"avc1.42E01E,mp4a.40.2\"\n" + DIR_360P + "/"
            + PLAYLIST_FILENAME + "\n";

    private static final String MASTER_ENTRY_480P = "#EXT-X-STREAM-INF:BANDWIDTH=1498000,AVERAGE-BANDWIDTH=1200000,"
            + "RESOLUTION=854x480,CODECS=\"avc1.4D401F,mp4a.40.2\"\n" + DIR_480P + "/"
            + PLAYLIST_FILENAME + "\n";

    private static final String MASTER_ENTRY_720P = "#EXT-X-STREAM-INF:BANDWIDTH=2996000,AVERAGE-BANDWIDTH=2400000,"
            + "RESOLUTION=1280x720,CODECS=\"avc1.4D401F,mp4a.40.2\"\n" + DIR_720P + "/"
            + PLAYLIST_FILENAME + "\n";

    @Override
    public void transcode360p(VideoTranscoderPayload payload) {
        transcodeResolution(payload, DIR_360P, PROFILE_360P, MASTER_ENTRY_360P);
    }

    @Override
    public void transcode480p(VideoTranscoderPayload payload) {
        transcodeResolution(payload, DIR_480P, PROFILE_480P, MASTER_ENTRY_480P);
    }

    @Override
    public void transcode720p(VideoTranscoderPayload payload) {
        transcodeResolution(payload, DIR_720P, PROFILE_720P, MASTER_ENTRY_720P);
    }

    private void transcodeResolution(VideoTranscoderPayload payload, String dirName,
            TranscodeProfile profile, String masterEntry) {

        String streamPath = Path.of(payload.getOutputDirectory(), dirName).toString();
        createStreamDirectory(streamPath);

        VideoTranscoderJob job = createAndSaveJob(payload);

        int maxAttempts = uploadProperties.getRetryMaxAttempts();
        long delayMs = uploadProperties.getRetryDelayMs();
        String label = dirName.replace("stream_", "").toUpperCase();

        TranscoderException lastException = null;

        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                log.info("[Transcode][{}] Attempt {}/{}", label, attempt, maxAttempts);

                String[] command = buildTranscoderCommand(payload.getSource(), streamPath, profile);
                runFfmpeg(payload, command, label);

                createMasterPlaylist(payload.getOutputDirectory(), masterEntry);
                markJobComplete(job);
                log.info("[Transcode][{}] Done ✓", label);
                return;

            } catch (TranscoderException ex) {
                lastException = ex;
                log.warn("[Transcode][{}] Attempt {}/{} failed: {}", label, attempt, maxAttempts,
                        ex.getMessage());

                if (attempt < maxAttempts) {
                    log.info("[Transcode][{}] Retrying in {}ms...", label, delayMs);
                    sleep(delayMs);
                }
            }
        }

        markJobFailed(job);
        throw new TranscoderException("[" + label + "] All " + maxAttempts + " attempts failed. "
                + "Last error: " + lastException.getMessage());
    }

    private static String progressBar(int pct) {
        int filled = pct; // 0–100 blok
        int empty = 100 - filled;
        return "[" + "█".repeat(filled) + "░".repeat(empty) + "]";
    }

    private void runFfmpeg(VideoTranscoderPayload payload, String[] commands, String label) {
        try {
            ProcessBuilder pb = new ProcessBuilder(commands);
            pb.redirectErrorStream(true);
            Process process = pb.start();

            long totalUs = 0L;
            int lastPct = -1;
            long lastPrintMs = 0L;

            System.out.println();
            System.out.println();
            System.out.println();

            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {

                String line;
                while ((line = reader.readLine()) != null) {

                    if (totalUs == 0 && line.contains("Duration:")) {
                        totalUs = parseDurationLine(line);
                        log.info("[Transcode][{}] Total duration: {}µs", label, totalUs);
                        continue;
                    }

                    if (line.startsWith("out_time_ms=")) {
                        if (totalUs <= 0)
                            continue;

                        long nowMs = System.currentTimeMillis();
                        if (nowMs - lastPrintMs < 500)
                            continue;

                        long elapsedUs = parseMicros(line, "out_time_ms=");
                        int pct = (int) Math.min(100, elapsedUs * 100 / totalUs);
                        int bucket = (pct / PROGRESS_LOG_STEP) * PROGRESS_LOG_STEP;

                        if (bucket > lastPct) {
                            lastPct = bucket;
                            lastPrintMs = nowMs;

                            Integer row = PROGRESS_LINES.get(label);
                            if (row != null) {
                                System.out.print("\033[s" + "\033[" + row + "A" + "\r\033[2K" + "["
                                        + label + "] " + progressBar(bucket) + " " + bucket + "%"
                                        + "\033[u");
                                System.out.flush();
                            }

                            if (bucket >= 100) {
                                log.info("[Transcode][{}] Done ✓", label);
                            }
                        }
                    }
                }
            }

            boolean finished = process.waitFor(payload.getResolution().getTimeout(), TimeUnit.MINUTES);

            if (!finished) {
                process.destroyForcibly();
                throw new TranscoderException(
                        "FFmpeg timeout for resolution: " + payload.getResolution());
            }

            int exitCode = process.exitValue();
            if (exitCode != 0) {
                throw new TranscoderException(
                        "FFmpeg exited with code " + exitCode + " for [" + label + "]");
            }

        } catch (TranscoderException ex) {
            throw ex;
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new TranscoderException("FFmpeg interrupted [" + label + "]: " + ex.getMessage());
        } catch (IOException ex) {
            throw new TranscoderException("FFmpeg I/O error [" + label + "]: " + ex.getMessage());
        } catch (Exception ex) {
            throw new TranscoderException(
                    "Unexpected FFmpeg error [" + label + "]: " + ex.getMessage());
        }
    }

    @Override
    public synchronized String createMasterPlaylist(String outputDir, String content) {
        try {
            Path path = Paths.get(outputDir, MASTER_FILENAME);
            String existing = Files.exists(path) ? Files.readString(path) : "";

            if (existing.contains(content))
                return path.toString();

            String updated = existing.isBlank() ? "#EXTM3U\n#EXT-X-VERSION:3\n\n" + content
                    : existing + "\n" + content;

            Files.writeString(path, updated, StandardCharsets.UTF_8);
            return path.toString();

        } catch (Exception ex) {
            throw new TranscoderException(
                    "Failed to update master playlist at '" + outputDir + "': " + ex.getMessage());
        }
    }

    public void createStreamDirectory(String path) {
        try {
            Files.createDirectories(Paths.get(path));
        } catch (IOException ex) {
            throw new TranscoderException(
                    "Failed to create stream directory '" + path + "': " + ex.getMessage());
        }
    }

    private VideoTranscoderJob createAndSaveJob(VideoTranscoderPayload payload) {
        VideoTranscoderJob job = VideoTranscoderJob.builder().source(payload.getSource())
                .outputDir(payload.getOutputDirectory()).resolution(payload.getResolution())
                .status(TranscodeStatus.PROCESSING)
                .resource(resourceService.findResourceById(payload.getResourceId())).build();
        return videoTranscoderJobRepository.save(job);
    }

    private void markJobComplete(VideoTranscoderJob job) {
        job.setFinishedAt(LocalDateTime.now());
        job.setStatus(TranscodeStatus.COMPLETE);
        videoTranscoderJobRepository.save(job);
    }

    private void markJobFailed(VideoTranscoderJob job) {
        job.setFinishedAt(LocalDateTime.now());
        job.setStatus(TranscodeStatus.FAILED);
        videoTranscoderJobRepository.save(job);
    }

    private String[] buildTranscoderCommand(String source, String streamPath, TranscodeProfile p) {

        List<String> cmd = new ArrayList<>();

        cmd.add(uploadProperties.getFfmpegDirectory());

        cmd.add("-progress");
        cmd.add("pipe:1");
        cmd.add("-nostats");

        cmd.add("-i");
        cmd.add(source);

        cmd.add("-map");
        cmd.add("0:v:0");
        cmd.add("-map");
        cmd.add("0:a:0");
        cmd.add("-sn");
        cmd.add("-dn");

        cmd.add("-vf");
        cmd.add(p.scale() + "," + p.pad());
        cmd.add("-pix_fmt");
        cmd.add("yuv420p");

        cmd.add("-c:v");
        cmd.add(VIDEO_CODEC);
        cmd.add("-preset");
        cmd.add(p.preset());
        if (p.tune() != null) {
            cmd.add("-tune");
            cmd.add(p.tune());
        }
        cmd.add("-crf");
        cmd.add(p.crf());
        cmd.add("-maxrate");
        cmd.add(p.maxrate());
        cmd.add("-bufsize");
        cmd.add(p.bufsize());
        cmd.add("-profile:v");
        cmd.add(p.profile());
        if (p.bfFrames() != null) {
            cmd.add("-bf");
            cmd.add(p.bfFrames());
        }
        cmd.add("-force_key_frames");
        cmd.add("expr:gte(t,n_forced*" + HLS_TIME + ")");

        cmd.add("-c:a");
        cmd.add(AUDIO_CODEC);
        cmd.add("-b:a");
        cmd.add(p.audioKbps());
        cmd.add("-ac");
        cmd.add("2");

        cmd.add("-f");
        cmd.add("hls");
        cmd.add("-hls_time");
        cmd.add(HLS_TIME);
        cmd.add("-hls_playlist_type");
        cmd.add("vod");
        cmd.add("-hls_list_size");
        cmd.add("0");
        cmd.add("-hls_segment_type");
        cmd.add("mpegts");
        cmd.add("-hls_flags");
        cmd.add("independent_segments");
        cmd.add("-hls_segment_filename");
        cmd.add(streamPath + "/" + SEGMENT_FILENAME);
        cmd.add(streamPath + "/" + PLAYLIST_FILENAME);

        return cmd.toArray(new String[0]);
    }

    private static long parseDurationLine(String line) {
        try {
            int idx = line.indexOf("Duration:") + "Duration:".length();
            String time = line.substring(idx).trim().split(",")[0].trim();
            String[] parts = time.split(":");
            double hours = Double.parseDouble(parts[0]);
            double minutes = Double.parseDouble(parts[1]);
            double seconds = Double.parseDouble(parts[2]);
            double total = hours * 3600 + minutes * 60 + seconds;
            return (long) (total * 1_000_000); // → microseconds
        } catch (Exception ex) {
            return 0L;
        }
    }

    /**
     * Parses the numeric value after a known prefix, e.g.
     * {@code "out_time_ms=123456"} →
     * {@code 123456L}. Returns 0 on any parse failure.
     */
    private static long parseMicros(String line, String prefix) {
        try {
            return Long.parseLong(line.substring(prefix.length()).trim());
        } catch (NumberFormatException ex) {
            return 0L;
        }
    }

    private static void sleep(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
    }
}

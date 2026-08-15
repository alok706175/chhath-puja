const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const SONGS_DIR = path.join(ROOT, "songs");

// Content Type Map
const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".mp3": "audio/mpeg"
};

const server = http.createServer((req, res) => {
    // 1. CORS Headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Range");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    // URL path decode karein
    let parsedUrl = req.url.split("?")[0];
    let decodedPath = "";
    try {
        decodedPath = decodeURIComponent(parsedUrl);
    } catch (e) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad Request");
        return;
    }

    // 2. Songs API Route (/songs)
    if (decodedPath === "/songs") {
        if (!fs.existsSync(SONGS_DIR)) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify([]));
            return;
        }

        fs.readdir(SONGS_DIR, (err, files) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Unable to read songs folder" }));
                return;
            }

            const songs = files
                .filter(file => path.extname(file).toLowerCase() === ".mp3")
                .map(file => ({
                    name: path.basename(file, path.extname(file)),
                    file: `/songs/${encodeURIComponent(file)}`
                }));

            res.writeHead(200, {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            });
            res.end(JSON.stringify(songs));
        });
        return;
    }

    // 3. Static Files & MP3 Streaming
    let relativePath = decodedPath === "/" ? "/index.html" : decodedPath;
    let filePath = path.join(ROOT, relativePath);

    // File check karein
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("File not found");
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || "application/octet-stream";

        // MP3 Audio Range Support (Streaming)
        if (ext === ".mp3") {
            const range = req.headers.range;
            const fileSize = stats.size;

            if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

                if (start >= fileSize || end >= fileSize || start > end) {
                    res.writeHead(416, { "Content-Range": `bytes */${fileSize}` });
                    res.end();
                    return;
                }

                const chunkSize = end - start + 1;
                res.writeHead(206, {
                    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunkSize,
                    "Content-Type": "audio/mpeg"
                });
                fs.createReadStream(filePath, { start, end }).pipe(res);
            } else {
                res.writeHead(200, {
                    "Content-Length": fileSize,
                    "Content-Type": "audio/mpeg",
                    "Accept-Ranges": "bytes"
                });
                fs.createReadStream(filePath).pipe(res);
            }
            return;
        }

        // Normal HTML/CSS/Images Static Serve
        res.writeHead(200, {
            "Content-Type": contentType,
            "Cache-Control": "no-cache"
        });
        fs.createReadStream(filePath).pipe(res);
    });
});

// Render host '0.0.0.0' par bind karta hai
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});
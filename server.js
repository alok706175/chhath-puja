const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const ROOT = __dirname;
const SONGS_DIR = path.join(ROOT, "songs");


const server = http.createServer((req, res) => {

    /*
    =========================================================
    CORS
    =========================================================
    Live Server (5500) se Node Server (3000) ko access
    karne ke liye.
    */

    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );


    /*
    =========================================================
    OPTIONS REQUEST
    =========================================================
    */

    if (req.method === "OPTIONS") {

        res.writeHead(204);

        res.end();

        return;
    }


    /*
    =========================================================
    SONGS LIST
    =========================================================
    */

    if (req.url === "/songs") {

        fs.readdir(
            SONGS_DIR,
            (err, files) => {

                if (err) {

                    res.writeHead(
                        500,
                        {
                            "Content-Type":
                                "application/json"
                        }
                    );

                    res.end(
                        JSON.stringify({
                            error:
                                "songs folder nahi mila"
                        })
                    );

                    return;
                }


                const songs =
                    files

                        .filter(
                            file =>
                                path
                                    .extname(file)
                                    .toLowerCase()
                                    === ".mp3"
                        )

                        .map(
                            file => ({

                                name:
                                    path.basename(
                                        file,
                                        path.extname(file)
                                    ),

                                /*
                                IMPORTANT:
                                Full URL use kar rahe hain,
                                isliye Live Server se bhi
                                MP3 load hoga.
                                */

                                file:
                                    `/songs/${encodeURIComponent(file)}`
                            })
                        );


                res.writeHead(
                    200,
                    {
                        "Content-Type":
                            "application/json",

                        "Cache-Control":
                            "no-cache",

                        "Access-Control-Allow-Origin":
                            "*"
                    }
                );


                res.end(
                    JSON.stringify(songs)
                );

            }
        );

        return;
    }


    /*
    =========================================================
    MP3 FILE
    =========================================================
    */

    if (
        req.url.startsWith("/songs/")
    ) {

        const encodedFileName =
            req.url.replace(
                "/songs/",
                ""
            );


        const fileName =
            decodeURIComponent(
                encodedFileName
            );


        /*
        Security:
        Folder ke bahar file access
        na ho.
        */

        const filePath =
            path.resolve(
                SONGS_DIR,
                fileName
            );


        const songsDirectory =
            path.resolve(
                SONGS_DIR
            );


        if (
            !filePath.startsWith(
                songsDirectory +
                path.sep
            )
        ) {

            res.writeHead(403);

            res.end(
                "Forbidden"
            );

            return;
        }


        if (
            !fs.existsSync(filePath)
        ) {

            res.writeHead(404);

            res.end(
                "Song not found"
            );

            return;
        }


        /*
        =====================================================
        MP3 STREAMING
        =====================================================
        */

        const stat =
            fs.statSync(filePath);


        const fileSize =
            stat.size;


        const range =
            req.headers.range;


        /*
        Browser audio player
        Range requests bhejta hai.
        */

        if (range) {

            const parts =
                range
                    .replace(
                        /bytes=/,
                        ""
                    )
                    .split("-");


            const start =
                parseInt(
                    parts[0],
                    10
                );


            const end =
                parts[1]
                    ? parseInt(
                        parts[1],
                        10
                    )
                    : fileSize - 1;


            if (
                start >= fileSize ||
                end >= fileSize ||
                start > end
            ) {

                res.writeHead(
                    416,
                    {
                        "Content-Range":
                            `bytes */${fileSize}`
                    }
                );

                res.end();

                return;
            }


            const chunkSize =
                end - start + 1;


            const stream =
                fs.createReadStream(
                    filePath,
                    {
                        start,
                        end
                    }
                );


            res.writeHead(
                206,
                {

                    "Content-Range":
                        `bytes ${start}-${end}/${fileSize}`,

                    "Accept-Ranges":
                        "bytes",

                    "Content-Length":
                        chunkSize,

                    "Content-Type":
                        "audio/mpeg",

                    "Access-Control-Allow-Origin":
                        "*"
                }
            );


            stream.pipe(res);

            return;
        }


        /*
        Normal request
        */

        res.writeHead(
            200,
            {

                "Content-Length":
                    fileSize,

                "Content-Type":
                    "audio/mpeg",

                "Accept-Ranges":
                    "bytes",

                "Access-Control-Allow-Origin":
                    "*"
            }
        );


        fs.createReadStream(
            filePath
        ).pipe(res);


        return;
    }


    /*
    =========================================================
    SERVE WEBSITE FILES
    =========================================================
    */

    let requestedPath =
        req.url.split("?")[0];


    if (
        requestedPath === "/"
    ) {

        requestedPath =
            "/index.html";

    }


    /*
    Decode URL
    */

    try {

        requestedPath =
            decodeURIComponent(
                requestedPath
            );

    } catch (error) {

        res.writeHead(400);

        res.end(
            "Bad Request"
        );

        return;
    }


    const filePath =
        path.resolve(
            ROOT,
            "." +
            requestedPath
        );


    /*
    =========================================================
    SECURITY
    =========================================================
    */

    if (
        filePath !== ROOT &&
        !filePath.startsWith(
            ROOT + path.sep
        )
    ) {

        res.writeHead(403);

        res.end(
            "Forbidden"
        );

        return;
    }


    /*
    =========================================================
    FILE
    =========================================================
    */

    fs.readFile(
        filePath,
        (err, data) => {

            if (err) {

                res.writeHead(
                    404,
                    {
                        "Content-Type":
                            "text/plain"
                    }
                );

                res.end(
                    "File not found"
                );

                return;
            }


            /*
            =================================================
            CONTENT TYPE
            =================================================
            */

            let contentType =
                "application/octet-stream";


            const extension =
                path
                    .extname(filePath)
                    .toLowerCase();


            switch (extension) {

                case ".html":

                    contentType =
                        "text/html";

                    break;


                case ".css":

                    contentType =
                        "text/css";

                    break;


                case ".js":

                    contentType =
                        "text/javascript";

                    break;


                case ".png":

                    contentType =
                        "image/png";

                    break;


                case ".jpg":

                case ".jpeg":

                    contentType =
                        "image/jpeg";

                    break;


                case ".webp":

                    contentType =
                        "image/webp";

                    break;


                case ".svg":

                    contentType =
                        "image/svg+xml";

                    break;


                case ".ico":

                    contentType =
                        "image/x-icon";

                    break;

            }


            res.writeHead(
                200,
                {
                    "Content-Type":
                        contentType,

                    "Cache-Control":
                        "no-cache"
                }
            );


            res.end(data);

        }
    );

});


/*
=========================================================
START SERVER
=========================================================
*/

server.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log("");
        console.log(
            "========================================"
        );

        console.log(
            " Chhath Music Server"
        );

        console.log(
            "========================================"
        );

        console.log(
            `Server running at: http://localhost:${PORT}`
        );

        console.log(
            `Songs folder: ${SONGS_DIR}`
        );

        console.log(
            "========================================"
        );

        console.log("");

    }
);
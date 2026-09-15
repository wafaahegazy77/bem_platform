const fs = require("fs");
const path = require("path");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = "0.0.0.0";
const logFile = path.join(__dirname, "request.log");

const app = next({
    dev: false,
    hostname,
    port,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        try {
            fs.appendFileSync(
                logFile,
                `${new Date().toISOString()} ${req.method} ${req.url}\n`
            );
        } catch (error) {
            console.error("Failed to write request log", error);
        }

        if (req.url) {
            req.url = req.url.replace(
                /\/index\.html(?=\?|$)/,
                "/"
            );
        }

        const parsedUrl = parse(req.url || "/", true);
        handle(req, res, parsedUrl);
    }).listen(port, hostname, () => {
        console.log(
            `> Ready on http://${hostname}:${port}`
        );
    });
});
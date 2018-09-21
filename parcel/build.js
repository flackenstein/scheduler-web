"use strict";
const Bundler = require("parcel-bundler");
const Path = require("path");
const fs = require("fs-extra");

// Remove build folder
fs.removeSync("./.build");

// Create build folder
fs.mkdirsSync("./.build");

// Copy Static files
fs.copySync("./src/assets/favicon.ico", "./.build/favicon.ico");
fs.copySync("./src/assets/robots.txt", "./.build/robots.txt");

// Entrypoint file location
const file = Path.join(__dirname, "../src/index.html");

// Bundler options
const options = {
    outDir: "./.build", // The out directory to put the build files in, defaults to dist
    outFile: "index.html", // The name of the outputFile
    publicUrl: "/", // The url to server on, defaults to dist
    watch: false, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== "production"
    cache: false, // Enabled or disables caching, defaults to true
    cacheDir: ".cache", // The directory cache gets put in, defaults to .cache
    contentHash: false, // Disable content hash from being included on the filename
    minify: true, // Minify files, enabled if process.env.NODE_ENV === "production"
    target: "browser", // browser/node/electron, defaults to browser
    https: false, // Serve files over https or http, defaults to false
    logLevel: 3, // 3 = log everything, 2 = log warnings & errors, 1 = log errors
    hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
    sourceMaps: false, // Enable or disable sourcemaps, defaults to enabled (not supported in minified builds yet)
    hmrHostname: "", // A hostname for hot module reload, default to ""
    detailedReport: true // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
};

const bundler = new Bundler(file, options);
bundler.bundle();

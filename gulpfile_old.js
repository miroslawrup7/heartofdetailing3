const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const terser = require("gulp-terser");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const browsersync = require("browser-sync").create();
const clean = require("gulp-clean");

const paths = {
    all: {
        dest: "./dist/*",
    },
    html: {
        src: ["./src/configurator/*.html"],
        dest: "./dist/configurator/",
    },
    html2: {
        src: ["./src/*.html"],
        dest: "./dist/",
    },
    config: {
        src: ["./src/**/config/**/*.json"],
        dest: "./dist/",
    },
    php: {
        src: ["./src/**/php/**/*.php"],
        dest: "./dist/",
    },
    fonts: {
        src: ["./src/**/fonts/**/*.*"],
        dest: "./dist/",
    },
    images: {
        src: ["./src/**/img/**/*.*"],
        dest: "./dist/",
    },
    styles: {
        src: ["./src/configurator/scss/**/*.scss"],
        dest: "./dist/configurator/css/",
    },
    styles2: {
        src: ["./src/*.scss"],
        dest: "./dist/",
    },
    scripts: {
        src: ["./src/configurator/**/*.js"],
        dest: "./dist/configurator/",
    },
    scripts2: {
        src: ["./src/*.js"],
        dest: "./dist/",
    },
    cachebust: {
        src: ["./dist/configurator/*.html"],
        dest: "./dist/configurator/",
    },
    cachebust2: {
        src: ["./dist/*.html"],
        dest: "./dist/",
    },
};

function clear() {
    return src(paths.all.dest, {
        read: false,
    }).pipe(clean());
}

function clearHtml() {
    return src(paths.html.dest, {
        read: false,
    }).pipe(clean());
}

function clearHtml2() {
    return src(paths.html2.dest, {
        read: false,
    }).pipe(clean());
}

function clearConfig() {
    return src(paths.config.dest, {
        read: false,
    }).pipe(clean());
}

function clearPHP() {
    return src(paths.php.dest, {
        read: false,
    }).pipe(clean());
}

function clearFonts() {
    return src(paths.fonts.dest, {
        read: false,
    }).pipe(clean());
}

function clearCss() {
    return src(paths.styles.dest, {
        read: false,
    }).pipe(clean());
}

function clearCss2() {
    return src(paths.styles2.dest, {
        read: false,
    }).pipe(clean());
}

function clearImg() {
    return src(paths.images.dest, {
        read: false,
    }).pipe(clean());
}

function clearScripts() {
    return src(paths.scripts.dest, {
        read: false,
    }).pipe(clean());
}

function clearScripts2() {
    return src(paths.scripts2.dest, {
        read: false,
    }).pipe(clean());
}

function copyHtml() {
    return src(paths.html.src)
        .pipe(dest(paths.html.dest));
}

function copyHtml2() {
    return src(paths.html2.src)
        .pipe(dest(paths.html2.dest));
}

function copyPHP() {
    return src(paths.php.src)
        .pipe(dest(paths.php.dest));
}

function copyFonts() {
    return src(paths.fonts.src)
        .pipe(dest(paths.fonts.dest));
}

function copyConfig() {
    return src(paths.config.src) 
        .pipe(dest(paths.config.dest));
}

function optimizeImages() {
    return src(paths.images.src)
        .pipe(imagemin().on("error", (error) => console.log(error)))
        .pipe(dest(paths.images.dest));
}

function compileStyles() {
    return src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        // .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(postcss([autoprefixer()])) // tymczasowo
        // .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("."))
        .pipe(dest(paths.styles.dest));
}

function compileStyles2() {
    return src(paths.styles2.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        // .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(postcss([autoprefixer()])) // tymczasowo
        // .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("."))
        .pipe(dest(paths.styles2.dest));
}

function minifyScripts() {
    return src(paths.scripts.src)
        .pipe(sourcemaps.init())
        // .pipe(concat("main.js"))
        // .pipe(terser().on("error", (error) => console.log(error)))
        // .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("."))
        .pipe(dest(paths.scripts.dest));
}

function minifyScripts2() {
    return src(paths.scripts2.src)
        .pipe(sourcemaps.init())
        // .pipe(concat("main.js"))
        // .pipe(terser().on("error", (error) => console.log(error)))
        // .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("."))
        .pipe(dest(paths.scripts2.dest));
}

function cacheBust() {
    return src(paths.cachebust.src)
        .pipe(replace(/cache_bust=\d+/g, "cache_bust=" + new Date().getTime()))
        .pipe(dest(paths.cachebust.dest));
}

function cacheBust2() {
    return src(paths.cachebust2.src)
        .pipe(replace(/cache_bust=\d+/g, "cache_bust=" + new Date().getTime() + "z"))
        .pipe(dest(paths.cachebust2.dest));
}

function browserSync(cb) {
    browsersync.init({
        server: {
            baseDir: paths.html2.dest,
        },
        port: 3000,
    });
    cb();
}

function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

function watcher() {
    watch(
        paths.html.src,
        series(clearHtml, copyHtml, cacheBust, browserSyncReload)
    );
    watch(
        paths.html2.src,
        series(clearHtml2, copyHtml2, cacheBust2, browserSyncReload)
    );
    watch(
        paths.config.src,
        series(clearConfig, copyConfig, browserSyncReload)
    );
    watch(
        paths.php.src,
        series(clearPHP, copyPHP, cacheBust, browserSyncReload)
    );
    watch(
        paths.fonts.src,
        series(clearFonts, copyFonts, cacheBust, browserSyncReload)
    );
    watch(
        paths.images.src, 
        series(clearImg, optimizeImages)
        );
    watch(
        paths.styles.src,
        series(clearCss, compileStyles, cacheBust, browserSyncReload)
    );
    watch(
        paths.styles2.src,
        series(clearCss2, compileStyles2, cacheBust2, browserSyncReload)
    );
    watch(
        paths.scripts.src,
        series(clearScripts, minifyScripts, cacheBust, browserSyncReload)
    );

    watch(
        paths.scripts2.src,
        series(clearScripts2, minifyScripts2, cacheBust2, browserSyncReload)
    );
}

exports.copyHtml = copyHtml;
exports.copyHtml2 = copyHtml2;
exports.copyPHP = copyPHP;
exports.copyFonts = copyFonts;
exports.copyConfig = copyConfig;
exports.optimizeImages = optimizeImages;
exports.compileStyles = compileStyles;
exports.compileStyles2 = compileStyles2;
exports.minifyScripts = minifyScripts;
exports.minifyScripts2 = minifyScripts2;
exports.cacheBust = cacheBust;
exports.cacheBust2 = cacheBust2;
exports.watcher = watcher;
exports.browserSync = browserSync;
exports.clear = clear;
exports.clearCss = clearCss;
exports.clearCss2 = clearCss2;
exports.clearImg = clearImg;
exports.clearScripts = clearScripts;
exports.clearScripts2 = clearScripts2;
exports.clearHtml = clearHtml;
exports.clearHtml2 = clearHtml2;
exports.clearPHP = clearPHP;
exports.clearFonts = clearFonts;

exports.default = series(
    clear,
    parallel(copyHtml, copyHtml2, copyPHP, copyFonts, copyConfig, optimizeImages, compileStyles, compileStyles2, minifyScripts, minifyScripts2),
    cacheBust,
    cacheBust2,
    browserSync,
    watcher
);

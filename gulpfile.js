const { src, dest, watch, parallel, series } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const mergeStream = require('merge-stream');
const webpack = require("webpack-stream");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const pug = require("gulp-pug");
const del = require("del");

// const path = require("path");
// const hash = require('gulp-hash');
// const references = require('gulp-hash-references');

// настройки webpack
const wpConfig = {
  mode: 'development',
  entry: {
    crossposting: "./src/pages/crossposting/crossposting.js",
    profile: "./src/pages/profile/profile.js",
    tariffs: "./src/pages/tariffs/tariffs.js",
  },
  output: {
    filename: "[name]/[name].js",
  },

  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: "all" 
    }
  }
};


// таски
function compileMarkup() {
  return src("src/pages/**/*.pug")
    .pipe(pug())
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}


function compileStyles() {
  let streamOne = src("src/pages/**/*.scss", /*{ sourcemaps: true }*/)
    // .pipe(autoprefixer({
    //     cascade: false
    //   }))
    .pipe(sass(/*{ outputStyle: 'compressed' }*/))
    .pipe(dest("dist", /*{ sourcemaps: "." }*/))  
    .pipe(browserSync.stream());

  let streamTwo = src("src/blocks/cards/cards.scss", /*{ sourcemaps: true }*/)
    // .pipe(autoprefixer({
    //     cascade: false
    //   }))
    .pipe(sass(/*{ outputStyle: 'compressed' }*/))
    .pipe(dest("dist/crossposting", /*{ sourcemaps: "." }*/))
    .pipe(browserSync.stream());

  return mergeStream(streamOne, streamTwo);
}



function processScripts() {
  return src("src/pages/**/*.js")
    .pipe(webpack(wpConfig))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}


function compressImg() {
  return src([
    "src/**/*.jpg", 
    "src/**/*.svg", 
    "src/**/*.png", 
    "src/**/*.gif", 
    "src/**/*.webp"
    ])
    // .pipe(imagemin())
    .pipe(rename( path => path.dirname = "images"))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}


function processFonts() {
  return src([
    "src/global-styles/fonts/*.ttf", 
    "src/global-styles/fonts/*.woff", 
    "src/global-styles/fonts/*.woff2"
    ])
    .pipe(dest("dist/fonts"));
}


function runWatcher() {
  watch("src/**/*.pug", compileMarkup);
  watch("src/**/*.scss", compileStyles);
  watch("src/**/*.js", processScripts);
  watch(["src/**/*.jpg", "src/**/*.svg", "src/**/*.png"], compressImg);
}


function cleanDist() {
  return del("dist/**/*");
}


function runServer() {
  browserSync.init({
    server: { baseDir: "dist" },
    notify: false,
    online: true
  })
}


exports.default = series(
  cleanDist,
  parallel(compileMarkup, compileStyles, processScripts, compressImg, processFonts),
  parallel(runServer, runWatcher)
);



// **************************************
// function compileTestPage() {
//  return src("src/pages/test/test.pug")
//   .pipe(pug())
//   .pipe(dest("dist"))
//   .pipe(browserSync.stream());
// }

// function compileTestStyles() {
//   return src("src/pages/test/test.scss")
//   .pipe(sass())
//   .pipe(dest("dist"))
//   .pipe(browserSync.stream());
// }

// function processTestImg() {
//   return src([
//     "src/**/*.jpg", 
//     "src/**/*.svg", 
//     "src/**/*.png", 
//     "src/**/*.gif", 
//     "src/**/*.webp"
//     ])
//     .pipe(rename( path => path.dirname = "images"))
//     .pipe(dest("dist"))
//     .pipe(browserSync.stream());
// }


// function runWatcher() {
//   watch("src/**/*.pug", compileTestPage);
//   watch("src/**/*.scss", compileTestStyles);
//   watch(["src/**/*.jpg", "src/**/*.svg", "src/**/*.png"], processTestImg);
// }

// exports.test = series(
//   cleanDist,
//   parallel(compileTestPage, compileTestStyles, processTestImg, processFonts),
//   parallel(runServer, runWatcher)
// );
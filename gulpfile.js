const { src, dest, watch, parallel, series } = require("gulp");
const browserSync = require("browser-sync").create();
const gcmq = require('gulp-group-css-media-queries');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const svgSprite = require('gulp-svg-sprite');
const mergeStream = require('merge-stream');
const webpack = require("webpack-stream");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const gulpif = require('gulp-if');
const pug = require("gulp-pug");
const del = require("del");

// const path = require("path");
// const hash = require('gulp-hash');
// const references = require('gulp-hash-references');

const isProd = process.argv.includes("--build");
const isDev = !isProd;  


// настройки webpack
const wpConfig = {
  mode: isDev ? "development" : "production",
  entry: {
    index: "./src/index.js",
    crossposting: "./src/pages/crossposting/crossposting.js",
    profile: "./src/pages/profile/profile.js",
    tariffs: "./src/pages/tariffs/tariffs.js",
  },
  output: {
    filename: "js/[name].js",
  },

  devtool: isDev ? "source-map" : undefined,
  optimization: {
    splitChunks: {
      chunks: "all" 
    }
  }
};


// таски
function compileMarkup() {
  return src(["src/pages/**/*.pug", "src/*.pug"])
    .pipe(pug())
    .pipe(rename(path => path.dirname = ""))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}


function compileStyles() {
  return src(["src/pages/**/*.scss", "src/*.scss"], { sourcemaps: isDev ? true : false })
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulpif(
      isProd, 
      autoprefixer({
        grid: true,
        overrideBrowserslist: ["last 3 versions"],
        cascade: false
      })
    ))
    .pipe(gulpif(isProd, gcmq()))
    .pipe(gulpif(
      isProd,
      sass({ outputStyle: 'compressed'})
    ))
    .pipe(rename(path => path.dirname = "css"))
    .pipe(dest("dist", { sourcemaps: isDev ? true : false  }))  
    .pipe(browserSync.stream());
}



function processScripts() {
  return src(["src/pages/**/*.js", "src/*.js"])
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
    "src/**/*.webp",
    "src/**/*.ico"
    ])
    .pipe(gulpif(isProd,imagemin() ))
    .pipe(rename( path => path.dirname = "images"))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}


function makeSvgSprite() {
  return src("src/**/*svg")
    .pipe(svgSprite({
      mode: {
        css: {
          sprite: "../images/icons.svg",
          render: {
            css: true
          }
        }
      }
    }))
    .pipe(rename( path => path.dirname = "images"))
    .pipe(dest("dist"));
}


function processFonts() {
  return src([
    "src/global-styles/fonts/*.eof",
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
  watch([
    "src/**/*.jpg", 
    "src/**/*.svg", 
    "src/**/*.png", 
    "src/**/*.gif", 
    "src/**/*.webp",
    "src/**/*.ico"
    ], 
    compressImg
  );
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

exports.makeSvgSprite = makeSvgSprite;

exports.default = series(
  cleanDist,
  parallel(compileMarkup, compileStyles, processScripts, compressImg, processFonts),
  parallel(runServer, runWatcher)
);


exports.build = series(
  cleanDist,
  parallel(compileMarkup, compileStyles, processScripts, compressImg, processFonts),
  parallel(runServer, runWatcher)
);
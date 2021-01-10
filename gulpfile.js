const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin"); //  Минимизатор HTML
const uglify = require("gulp-uglify-es"); //  Минимизатор JS
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const sync = require("browser-sync").create();
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass()) // sass -> css
    .pipe(postcss([
      autoprefixer(),
      csso() // минификация css
    ]))
    .pipe(rename("style.min.css")) // style.css -> style.min.css
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream()); // обновление файлов для сервера
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(gulp.dest("build"));
}

exports.html = html;

// Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream()); // обновление файлов для сервера
}

exports.scripts = scripts;

// Images

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.mozjpeg({
        quality: 90,
        progressive: true
      }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
}

exports.images = images;

// Webp

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 80 }))
    .pipe(gulp.dest("build/img"));
}

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp.src("source/img/sprite/*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite_auto.svg"))
    .pipe(gulp.dest("build/img/sprite"));
}

exports.sprite = sprite;

// Copy

const copy = (done) => {
  return gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/**/*.{jpg,png,svg}"
  ],
    {
      base: "source"
    })
    .pipe(gulp.dest("build"))
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build")
}

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/*.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
  gulp.watch("source/img/sprite/*.svg", gulp.series(sprite, reload));
}

exports.server = server;

// Reload

const reload = done => {
  sync.reload();
  done();
}

// Build

const build = gulp.series(
  clean,
  styles,
  scripts,
  sprite,
  copy,
  createWebp,
  html
);

exports.build = build;

exports.default = gulp.series(
  build,
  server
);

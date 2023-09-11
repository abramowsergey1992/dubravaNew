const {src, dest, parallel, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const notify = require('gulp-notify')
const rename = require('gulp-rename')
const autoPrefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const sourceMaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
const fileInclude = require('gulp-file-include')
const svgSprite = require('gulp-svg-sprite')
const svgMin = require('gulp-svgmin')
const cheerio = require('gulp-cheerio')
const replace = require('gulp-replace')
const cleanDirectory = require('del')
const uglify = require('gulp-uglify-es').default

const cleanApp = () => {
  return cleanDirectory(['app/*'])
}

const loadScripts = () => {
  return src('./src/theme/js/**/**.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('./app/theme/js/'))
}

const loadStyles = () => {
  return src('./src/theme/scss/app.scss')
    .pipe(sourceMaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', notify.onError()))
    .pipe(rename({suffix: '.min'}))
    .pipe(autoPrefixer({cascade: false}))
    .pipe(cleanCSS({level: 2}))
    .pipe(sourceMaps.write('.'))
    .pipe(dest('./app/theme/css'))
    .pipe(browserSync.stream())
}

const loadFonts = () => {
  return src(['./src/theme/fonts/**/*.{eot,ttf,woff,woff2}'])
    .pipe(dest('./app/theme/fonts/'))
}

const loadImgs = () => {
  src(['./src/img/**/**.{jpg,png,webp,svg}'])
    .pipe(dest('./app/img/'))
  return src(['./src/theme/img/**/**.{jpg,png,webp,svg}'])
    .pipe((dest('./app/theme/img/')))
}

const loadVideos = () => {
  return src(['./src/videos/**/**.mp4'])
    .pipe(dest('./app/videos/'))
}

const loadSprites = () => {
  return src('./src/theme/sprite/**/**.svg')
    .pipe(svgMin({ js2svg: { pretty: true } }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill')
        $('[stroke]').removeAttr('stroke')
        $('[style]').removeAttr('style')
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({ mode: { stack: { sprite: '../sprite.svg' } } }))
    .pipe(dest('./app/theme/img'))
}

const loadHtml = () => {
  return src('./src/**.html')
    .pipe(fileInclude({prefix: '@', basepath: '@file'}))
    .pipe(dest('./app'))
    .pipe(browserSync.stream())
}

const pp = () => {
  return src('./src/pp/*')
    .pipe(dest('./app/pp/'))
}

const watcher = () => {
  browserSync.init({
    server: {
      baseDir: './app'
    },
    notify: false,
    ui: false,
    open: false,
    scrollThrottle: 100,
  })
  watch('./src/img/**/*.{jpg,png,webp,svg}', loadImgs)
  watch('./src/theme/img/**.{jpg,png,webp,svg}', loadImgs)
  watch('./src/videos/**/**.mp4', loadVideos)
  watch('./src/theme/img/ui/**.svg', loadSprites)
  watch('./src/**.html', loadHtml)
  watch('./src/components/**/*.tpl', loadHtml)
  watch('./src/theme/js/**/**.js', loadScripts)
  watch('./src/theme/fonts/**/*.{eot,ttf,woff,woff2}', loadFonts)
  watch('./src/theme/scss/**/*.scss', loadStyles)
}

exports.default = series(cleanApp, parallel(loadScripts, loadStyles, loadFonts, loadImgs, loadVideos, loadSprites, loadHtml, pp), watcher)
exports.build = series(cleanApp, parallel(loadScripts, loadStyles, loadFonts, loadImgs, loadVideos, loadSprites, loadHtml))

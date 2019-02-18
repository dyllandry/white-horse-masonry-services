const { src, dest, watch, parallel, series } = require('gulp')
const rimraf = require('rimraf')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin')

const buildDir = `${__dirname}/public`
const pagesDir = `${__dirname}/pages`
const stylesDir = `${__dirname}/pages/styles`
const imagesDir = `${__dirname}/pages/images`

function clean (cb) {
  rimraf(`${buildDir}/**`, cb)
}

function template () {
  return src(`${pagesDir}/*.pug`)
    .pipe(pug())
    .pipe(dest(buildDir))
}

function _watch () {
  watch(`${pagesDir}/*.pug`, template)
  watch(`${stylesDir}/*.scss`, css)
  watch(`${imagesDir}/*`, images)
}

function css () {
  return src(`${stylesDir}/**/*.scss`)
    .pipe(sass().on(`error`, sass.logError))
    .pipe(dest(`${buildDir}/styles`))
}

function build(cb) {
  return series(clean,
    parallel(css, template, images)
  )(cb)
}

function images () {
  return src(`${imagesDir}/*`)
    .pipe(imagemin())
    .pipe(dest(`${buildDir}/images`))
}


module.exports = {
  template,
  watch: series(build, _watch),
  clean,
  css,
  build,
}

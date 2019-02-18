const { src, dest, watch } = require('gulp')
const rimraf = require('rimraf')
const pug = require('gulp-pug')

const buildDir = `${__dirname}/public`
const pagesDir = `${__dirname}/pages`

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
}

module.exports = {
  template,
  watch: _watch,
  clean,
}

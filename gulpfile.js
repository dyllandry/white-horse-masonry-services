const { src, dest } = require('gulp')
const rimraf = require('rimraf')
const pug = require('gulp-pug')

const buildDir = `${__dirname}/public`
const pagesDir = `${__dirname}/pages`

exports.clean = function (cb) {
  rimraf(`${buildDir}/**`, cb)
}

exports.template = function () {
  return src(`${pagesDir}/*.pug`)
    .pipe(pug())
    .pipe(dest(buildDir))
}

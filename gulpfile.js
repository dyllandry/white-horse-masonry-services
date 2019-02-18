const rimraf = require('rimraf')

const buildDir = `${__dirname}/public`

exports.clean = function (cb) {
  rimraf(`${buildDir}/**`, cb)
}

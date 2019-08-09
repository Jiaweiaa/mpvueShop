'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // BASE_API: '"http://120.27.1.42:8003"'
  // BASE_API: '"https://jf.ibaituan.cn"'
  BASE_API: '"http://47.104.173.227:8003"'
  // BASE_API: '"http://192.168.0.10:8003"'

})

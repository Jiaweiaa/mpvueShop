'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  BASE_API: '"http://192.168.0.10:8003"'
  // BASE_API: '"http://120.27.1.42:8003"'
  // BASE_API: '"http://192.168.0.8:8003"'
  // BASE_API: '"https://mall.gaoshanapp.com"'
  // BASE_API: '"http://192.168.1.109:8003"'
  // BASE_API: '"http://120.27.1.42:8003"'
  // BASE_API: '"https://jf.ibaituan.cn"'
  // BASE_API: '"http://192.168.1.188:8003"'
  // BASE_API: '"http://192.168.3.29:8003"'
  // BASE_API: '"http://39.97.233.168:8003"'
  // BASE_API: '"http://192.168.1.181:8003"'
  // BASE_API: '"http://120.27.1.42:8003"'
  // BASE_API: '"http://gateway.gaoshanmall.com"'
  // BASE_API: '"http://gateway.gaoshanmall.com"'
  // BASE_API: '"http://47.104.173.227:8003"'
  // BASE_API: '"http://192.168.0.16:8003"'
  // BASE_API: '"http://192.168.0.10:8003"'

  // BASE_API: '"http://47.110.126.198:8003"'
  // BASE_API: '"http://192.168.1.188:8003"'
  // BASE_API: '"http://192.168.1.188:8003"'
  //  BASE_API: '"http://192.168.3.4:8003"'
})

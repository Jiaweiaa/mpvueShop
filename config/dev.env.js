/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 09:01:37
 * @LastEditTime: 2019-08-22 17:03:51
 * @LastEditors: Please set LastEditors
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // BASE_API: '"http://120.27.1.42:8003"'
  BASE_API: '"https://jf.ibaituan.cn"'
  // BASE_API: '"http://39.97.233.168:8003"'
  // BASE_API: '"http://192.168.1.188:8003"'

})


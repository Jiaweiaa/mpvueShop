/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 09:01:37
 * @LastEditTime: 2019-08-14 09:08:56
 * @LastEditors: Please set LastEditors
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // BASE_API: '"http://120.27.1.42:8003"'
  BASE_API: '"https://jf.ibaituan.cn"'
  // BASE_API: '"http://192.168.1.188:8003"'

})


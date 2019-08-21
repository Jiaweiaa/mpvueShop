/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 08:45:10
 * @LastEditTime: 2019-08-21 08:48:12
 * @LastEditors: Please set LastEditors
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // BASE_API: '"http://120.27.1.42:8003"'
   BASE_API: '"https://mall.gaoshanapp.com"'
  // BASE_API: '"http://192.168.0.10:8003"'

})

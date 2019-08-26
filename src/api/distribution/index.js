/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-23 15:30:03
 * @LastEditTime: 2019-08-26 11:45:32
 * @LastEditors: Please set LastEditors
 */
import fly from '../request';
let querystring = require("querystring");

// 我的二维码
export const showQRCodeToScan = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/basic/memRelationShip/myQrCode`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};


// 绑定上级
export const scanQrCode = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/basic/memRelationShip/scanQrCode`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

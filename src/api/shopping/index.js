/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 14:25:58
 * @LastEditTime: 2019-06-24 14:25:58
 * @LastEditors: your name
 */
import fly from '../request';
let querystring = require("querystring");

// 获取会员信息
export const getMemberAmount = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/basic/mem/myAccount/getMemberAmount`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};


// 获取积分记录
export const getShoppingBeansLogList = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/basic/mem/myAccount/getShoppingBeansLogList`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

// 充值积分
export const rechargeShoppingBeans = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/basic/mem/myAccount/rechargeShoppingBeans`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

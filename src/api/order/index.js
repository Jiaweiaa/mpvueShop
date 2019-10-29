/*
 * @Author: your name
 * @Date: 2019-09-12 11:26:21
 * @LastEditTime: 2019-10-25 15:59:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin-master/Users/duang/Desktop/mpvueShop/src/api/order/index.js
 */
import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();
// 下单
export const createOrder = params => {
  return fly.request({
    url: `/trade/transaction/createOrder`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};
//使用优惠券
export const useCoupon = params => {
  return fly.request({
    url: `/trade/transaction/useCoupon`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};
//取消使用优惠券
export const cancelCoupon = params => {
  return fly.request({
    url: `/trade/transaction/cancelCoupon`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};
// 订单详情
export const orderDetail = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/ActOrd/orderDetail`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};
//物流详情
export const logisticsDetail = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/ActOrd/logisticsDetail`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};
// 删除订单
export const removeOrderByCode = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/ActOrd/removeOrderByCode`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};
// 确定收货
export const confirmReceive = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/ActOrd/confirmReceived`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};
// 用户确认收货
export const capConfirmReceived = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/ActOrd/capConfirmReceived`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};
//申请取消订单(付款后发货前)
export const applyCancelOrder = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/refund/cancelorder`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

// 取消订单
export const cancleOrder = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/ActOrd/cancleOrder`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};
// 支付
export const toPay = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `trade/payment/toPay`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};
//下单后根据code查询订单ID
export const afterOrderDetail = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `trade/ActOrd/afterOrderDetail`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

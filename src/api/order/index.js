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
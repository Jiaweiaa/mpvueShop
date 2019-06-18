import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 全部订单
export const findAllOrders = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/ActOrd/findAllOrders`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

// 订单详情
export const orderDetail = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/ActOrd/findAllOrders`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

// 全部订单
export const findAllCapOrders = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/ActOrd/findAllCapOrders`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

// 核销
export const writeOff = params => {
  return fly.request({
    url: `/trade/ActOrd/writeOff`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};


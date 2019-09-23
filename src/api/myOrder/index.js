import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();
//获取退换货订单列表
export const findAllRefundOrders = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/refund/findAllRefundOrders`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

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

//获取各种订单数量
export const findOrderNum = params => {
  return fly.request({
    url: `/trade/ActOrd/findOrderNum`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};

// 一键收货
export const toWriteOff = params => {
  return fly.request({
    url: `/trade/ActOrd/toWriteOff`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};

// 获取积分,购物豆
export const getMemberAmount = params => {
  return fly.request({
    url: `/basic/mem/myAccount/getMemberAmount`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};

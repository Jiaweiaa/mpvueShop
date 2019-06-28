import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();
// 退货
export const applyRefund = params => {
  return fly.request({
    url: `/trade/refund/applyRefund`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};

// 申请退货订单内可退的订单行
export const findAvailableOrderlines = params => {
  return fly.request({
    url: `/trade/refund/findAvailableOrderlines`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};
// 全部退货列表
export const findAllRefundOrders = params => {
  return fly.request({
    url: `/trade/refund/findAllRefundOrders`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};
//放弃退换货
export const giveUpRefund = params => {
  return fly.request({
    url: `/trade/refund/giveUpRefund`,
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
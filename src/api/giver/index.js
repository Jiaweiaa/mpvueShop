import fly from '../request';
let querystring = require("querystring");

// 获取会员信息
export const findAllSupOrders = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/ActOrd/findAllSupOrders`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

// 供货商发货
export const supSendConfrim = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/ActOrd/supSendConfrim`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

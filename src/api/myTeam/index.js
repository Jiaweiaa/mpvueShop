import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 我的信息
export const myDetile = params => {
  return fly.request({
    url: `/shop/froCaptain/myDetile`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};

// 获取所有订单
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

//团长佣金排行表
export const getCaptainPageByCommission = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/shop/froCaptain/getCaptainPageByCommission`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

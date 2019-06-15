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
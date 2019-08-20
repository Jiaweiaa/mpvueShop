import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();

//  获取优惠券
export const flashSaleList = params => {
  return fly.request({
    url: `/product/flashsale/flashSaleList`,
    method: "post",
    body: params,
    headers: {
      "content-type": "application/json"
    },
  });
};

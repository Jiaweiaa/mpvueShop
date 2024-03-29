import fly from '../request';
import {noTokenFly} from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 团长列表
export const getDistance = params => {
  return noTokenFly.request({
    url: `/shop/captain/getDistance`,
    method: "post",
    body: params,
    headers: {
       "content-type": "application/json"
    },
  });
};



// 获取首页数据
export const getIndexItem = params => {
  return noTokenFly.request({
    url: `/product/mallIndex/getIndexItem`,
    method: "post",
    body: params,
    headers: {
      "content-type": "application/json"
    },
  });
};

// 领取优惠券
export const getcoupon = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/front/coupon/getcoupon`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

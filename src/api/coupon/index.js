import fly from '../request';
let querystring = require("querystring");

// 优惠券
export const getMemberCoupon = params => {
  return fly.request({
    url: `/basic/memCoupon/getMemberCoupon`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};


import fly from '../request';
let querystring = require("querystring");

// 退款详情
export const findRefundOrderDetail = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/refund/findRefundOrderDetail`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

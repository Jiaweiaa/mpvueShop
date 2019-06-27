import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 全部订单
export const getDistance = params => {
  return fly.request({
    url: `/shop/captain/getDistance`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};




// 获取首页数据
export const getIndexItem = params => {
  return fly.request({
    url: `/product/mallIndex/getIndexItem`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};

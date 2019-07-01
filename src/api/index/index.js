import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 团长排行
export const getDistance = params => {
  return fly.request({
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
  return fly.request({
    url: `/product/mallIndex/getIndexItem`,
    method: "post",
    body: params,
    headers: {
      "content-type": "application/json"
    },
  });
};

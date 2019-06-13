import fly from '@/utils/request';
let querystring = require("querystring");

// 获取菜单
export const goodsDetail = params => {
  let data = querystring.encode(params);
  return fly.post(fly.baseURL +"/product/pdp/detail",
    data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }})
};


import fly from './request';
let querystring = require("querystring");

// 获取商品详情
export const getGoodsDetail = params => {
  let data = querystring.encode(params);
  return fly.post("/product/pdp/detail",
    data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }})
};


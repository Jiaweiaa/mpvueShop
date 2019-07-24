import fly from '../request';
import {noTokenFly} from '../request';
let querystring = require("querystring");

// 获取商品详情
export const getGoodsDetail = params => {
  let data = querystring.encode(params);
  return noTokenFly.post("/product/pdp/detail",
    data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }})
};

//获取本商品购买记录
export const itemPurchaseHistory = params => {
  let data = querystring.encode(params);
  return noTokenFly.post("/trade/ActOrd/itemPurchaseHistory",
    data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }})
};

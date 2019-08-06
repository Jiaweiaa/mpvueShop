import fly from "../request";
import { noTokenFly } from "../request";
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 获取店铺信息
export const getStoreInfo = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: "/store/storeFront/getStoreInfo",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  });
};
//关注店铺
export const collectionStoreOrItem = params => {
  return fly.request({
    url: "/basic/memFavorites/collectionStoreOrItem",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};
// 取消关注店铺
export const cancelFavoriteByStoreId = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: "/basic/memFavorites/cancelFavoriteByStoreId",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  });
};

//获取店铺内的商品分类树
export const getStoreNavigationTree = params => {
  return fly.request({
    url: "/store/storeFront/getStoreNavigationTree",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};

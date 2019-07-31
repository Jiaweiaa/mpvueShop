import fly from '../request';
import {noTokenFly} from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 购物车列表
export const shoppingCartList = params => {
  return fly.request({
    url: "/trade/shoppingcart/shoppingCartList",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },

  });
};
// 添加购物车
export const addShoppingcart = params => {
  return fly.request({
    url: "/trade/shoppingcart/addShoppingcart",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};
//获取购物车中的商品数量
export const shoppingcartCount = params => {
  return fly.request({
    url: "/trade/shoppingcart/shoppingcartCount",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};
//更新购物车
export const updateShoppingcart = params => {
  return fly.request({
    url: "/trade/shoppingcart/updateShoppingcart",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};
//删除购物车
export const delShoppingcart = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: "/trade/shoppingcart/delShoppingcart",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  });
};
//下单前检查购物车
export const checkShoppingcart = params => {
  return fly.request({
    url: "/trade/shoppingcart/checkShoppingcart",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};

//获取优惠券列表
export const availableCoupon = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: "/trade/front/coupon/availableCoupon",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  });
};
//领取优惠券
export const getcoupon = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: "/trade/front/coupon/getcoupon",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  });
};
//购物车跳转下单页面
export const ShopCartOrderconfirm = params => {
  return fly.request({
    url: "/trade/transaction/buyNow/shoppingcart/orderconfirm",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};
//商品详情跳转下单页面
export const detailOrderconfirm = params => {
  return fly.request({
    url: "/trade/transaction/buyNow/pdp/orderconfirm",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};

// 获取积分
export const getMemberAmount = params => {
  return fly.request({
    url: "/basic/mem/myAccount/getMemberAmount",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};

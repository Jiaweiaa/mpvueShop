import fly from "../request";
let querystring = require("querystring");
let deviceId = new Date().getTime();


// 登录接口
export const littleAppLogin = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: "basic/auth/wechat/littleAppLogin",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  });
};
//注册接口
export const littleAppRegister = params => {
  return fly.request({
    url: "basic/auth/wechat/littleAppRegister",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};
//刷新token接口
export const refreshToken = params => {
  return fly.request({
    url: "basic/auth/user/refreshToken",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};
//解密手机号
export const getPhoneNumber = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: "basic/auth/wechat/getPhoneNumber",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  });
};


// 是否是团长
export const isCapOrSup = params => {
  return fly.request({
    url: "/shop/froCaptain/isCapOrSup",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};

//是否已经申请过团长
export const checkCap = params => {
  return fly.request({
    url: "/shop/froCaptain/checkCap",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};

//是否已经申请过供应商
export const checkSup = params => {
  return fly.request({
    url: "/shop/froCaptain/checkSup",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};


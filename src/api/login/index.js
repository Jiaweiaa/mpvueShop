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


import fly from "../request";
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 查询用户信息
export const getMemberProfile = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/basic/member/getMemberProfile`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};
//修改用户信息
export const updateMemberInfo = params => {
  
  return fly.request({
    url: `/basic/member/updateMemberInfo`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

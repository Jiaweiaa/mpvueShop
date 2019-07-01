import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 新增地址
export const insertOrEditMemAddress  = params => {
  return fly.request({
    url: "/basic/memAddress/insertOrEditMemAddress",
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    body: params
  });
};

// 列表
export const getMemAddressList = params => {
  return fly.request({
    url: `/basic/memAddress/getMemAddressList`,
    method: "post",
    body: params,
    headers: {
      "content-type": "application/json"
    },
  });
};

// 删除地址
export const deleteMemAddress = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/basic/memAddress/deleteMemAddress`,
    method: "post",
    body: data,
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
  });
};

// 设置默认地址
export const setDefaultAddress = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/basic/memAddress/setDefaultAddress`,
    method: "post",
    body: data,
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
  });
};




import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 团长新增团长
export const saveOrEditCaptain = params => {
  return fly.request({
    url: `/shop/captain/saveOrEditCaptain`,
    method: "post",
    body: params,
    headers: {
      "content-type": "application/json"
    }
  });
};

// 供应商新增
export const addSupplier = params => {
  return fly.request({
    url: `/shop/supplier/addSupplier`,
    method: "post",
    body: params,
    headers: {
      "content-type": "application/json"
    }
  });
};

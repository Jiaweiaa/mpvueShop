import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 获取菜单
export const getNavigations = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: "/store/navigation/getPlatformNavigations",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  });
};


// 获取菜单
export const searchItem = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: "/product/plp/searchItem",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  });
};

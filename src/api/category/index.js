import fly from "../request";
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

// 搜索商品
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

// 热门搜索
export const getKeyword = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: "/product/mallIndex/getKeyword",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  });
};

// 存历史记录
export const setHistorySearch = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: "/product/mallIndex/setHistorySearch",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  });
};

// 获取历史记录
export const findHistorySearch = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: "/product/mallIndex/findHistorySearch",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  });
};

// 清除历史
export const removeHistorySearch = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: "/product/mallIndex/removeHistorySearch",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  });
};

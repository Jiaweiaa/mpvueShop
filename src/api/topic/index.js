import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 获取文章列表
export const getNewsPage = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/shop/newsFro/getNewsPage`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};
//获取新闻详情
export const getNewsById = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/shop/newsFro/getNewsById`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};


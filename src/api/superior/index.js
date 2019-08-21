import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 上级详情
export const myParentInfo = params => {
  return fly.request({
    url: `/basic/memRelationShip/myParentInfo`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};

// 下级列表
export const myChildrenInfo = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/basic/memRelationShip/myChildrenInfo`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

import fly from '../request';
let querystring = require("querystring");

// 我的二维码
export const showQRCodeToScan = params => {
  return fly.request({
    url: `/basic/memRelationShip/showQRCodeToScan`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};


// 绑定上级
export const scanQrCode = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/basic/memRelationShip/scanQrCode`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

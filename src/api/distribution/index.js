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


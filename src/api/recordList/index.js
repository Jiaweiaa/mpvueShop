import fly from "../request";
let querystring = require("querystring");
let deviceId = new Date().getTime();
// 获取发放记录
export const getScoreLogPage = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `basic/memRelationShip/getScoreLogPage`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

let Fly = require("flyio/dist/npm/wx");
let fly = new Fly();
// fly.config.baseURL = " http://47.104.173.227:8003";
// fly.config.baseURL = " http://192.168.0.10:8003";
fly.config.baseURL = " http://192.168.3.29:8003";
// http://47.104.173.227:8003
//http://192.168.0.10:8003
// fly.config.withCredentials = true //允许携带cookie
fly.interceptors.request.use(
  config => {
    if (wx.getStorageSync("g_i") != "") {
      config.headers = {
        cookie: wx.getStorageSync("g_i")
      };
      // console.log(wx.getStorageSync("g_i"));
    }
    if (config.method === "GET") {
      let openId = wx.getStorageSync("openId");
      config.headers["openId"] = openId;
    }
    if (config.method === "POST") {
      let openId = wx.getStorageSync("openId");
      config.headers["openId"] = openId;
      config.headers.Authorization =
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyIqIl0sImV4cCI6MTU2MjA1MzU4OSwianRpIjoiMmI2MGEyODItMjgxNy00Zjc1LWFlZGItOWQ4YzY2MTY2ZjA0IiwiY2xpZW50X2lkIjoiY2xvdWRtYWxsLWNsaWVudC1iYXNpYy1hdXRoIiwidGltZXN0YW1wIjoxNTYxMTg5NTg5MTk0fQ.s0fhrIf012_pQSMxEHLLv_ZR0vVFDDFRL-Z5mngO1R0";
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default fly;

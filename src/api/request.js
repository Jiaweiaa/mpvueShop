let Fly = require("flyio/dist/npm/wx");
let fly = new Fly();
// fly.config.baseURL = " http://47.104.173.227:8003";
// fly.config.baseURL = "http://192.168.0.10:8003" ;
fly.config.baseURL = " http://39.97.233.168:8003";
// fly.config.baseURL = " https://mall.gaoshanapp.com";
// http://47.104.173.227:8003
//http://192.168.0.10:8003
// fly.config.withCredentials = true //允许携带cookie
fly.interceptors.request.use(
  config => {
    // console.log(wx.getStorageSync("token"),'我在获取token');
    // console.log(wx.getStorageSync("aa"),'我在获取aa');
    if (wx.getStorageSync("shopToken") != "") {
      let token = wx.getStorageSync("shopToken");
      // console.log(token);
      config.headers.Authorization = "Bearer " + token;
    }
    if (config.method === "GET") {
      let openId = wx.getStorageSync("openId");
      config.headers["openId"] = openId;
    }
    if (config.method === "POST") {
      let openId = wx.getStorageSync("openId");
      config.headers["openId"] = openId;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
fly.interceptors.response.use(
  response => {
    //登录状态已失效
    if (response.data == "") {
      wx.showModal({
        title: "提示",
        content: "登录状态已失效是否重新登录",
        success:(res)=> {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/login/main"
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
    //只将请求结果的data字段返回
    return response;
  },
  err => {
    console.log(err);
    // console.log(err.status);
    //如果接口错误信息是401 则代表请求时没携带token 跳转登录页去获取token
    if (err.status == "401") {
      wx.navigateTo({
        url: "/pages/login/main"
      });
    }
    //  wx.navigateTo({
    //     url: "/pages/login/main"
    //   });
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
  }
);

export default fly;

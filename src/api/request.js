let Fly = require("flyio/dist/npm/wx");
let fly = new Fly();
// fly.config.baseURL = " http://47.104.173.227:8003";
// fly.config.baseURL = "http://120.27.1.42:8003" ;
// fly.config.baseURL = " http://39.97.233.168:8003";
// fly.config.baseURL = " https://mall.gaoshanapp.com";
// fly.config.baseURL = " https://jf.ibaituan.cn";
export const refreshToken = params => {
  return Fly.request({
    url: `${process.env.BASE_API}/auth/user/refreshToken`,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
};

fly.config.baseURL = process.env.BASE_API;
// fly.config.baseURL = "http://192.168.1.188:8003" ;
// http://47.104.173.227:8003
//http://192.168.0.10:8003
// fly.config.withCredentials = true //允许携带cookie

/*是否正在刷新的标志*/
let isRefreshing = false;
/*存储请求的数组*/
let refreshSubscribers = [];

/*将所有的请求都push到数组中,其实数组是[function(token){}, function(token){},...]*/
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

/*数组中的请求得到新的token之后自执行，用新的token去请求数据*/
function onRrefreshed(token) {
  refreshSubscribers.map(cb => cb(token));
}
/*判断当前token是否需要续租,根据时间戳来判断*/
function isAccessTokenExpired() {
  var timestamp = new Date().getTime();
  if (
    timestamp - wx.getStorageSync("tokenInfo").timestamp >
    wx.getStorageSync("tokenInfo").expires_in
  ) {
    return true;
  } else {
    return false;
  }
}
fly.interceptors.request.use(
  config => {
    var timestamp = new Date().getTime();
    // console.log(1562739013231-1562739012291);
    //根据本地缓存是否存储shopToken判断用户是否登录
    if (wx.getStorageSync("tokenInfo")) {
      let token = wx.getStorageSync("tokenInfo").access_token;
      // console.log(token,'1133');
      config.headers.Authorization = "Bearer " + token;
      //判断token是否过期
      if (
        isAccessTokenExpired() &&
        config.url != "basic/auth/user/refreshToken"
      ) {
        /*首先所有的请求来了，我们要先判断当前是否正在刷新，如果不是，将刷新的标志置为true并请求刷新token；如果是，将请求存储到数组中*/
        if (!isRefreshing) {
          isRefreshing = true;
          refreshtoken().then(res => {
            /*将刷新的token替代老的token*/
            config.headers.Authorization = "Bearer " + res.data.data.token;
            /*更新缓存中的tokenInfo对象*/
            wx.setStorageSync("tokenInfo", res.data.result.token);
            /*执行数组里的请求，重新发起被挂起的请求*/
            onRrefreshed(res.data.data.token);
          });
          let retry = new Promise((resolve, reject) => {
            /*(token) => {...}这个函数就是cb*/
            subscribeTokenRefresh(token => {
              config.headers.Authorization = "Bearer " + token;
              /*将请求挂起*/
              resolve(config);
            });
          });
          return retry;
        }
      } else {
        return config;
      }
    } else {
      /*如果没有登录直接返回请求*/
      return config;
    }

    // if (wx.getStorageSync("shopToken") != "") {
    //   let token = wx.getStorageSync("shopToken");
    //   // console.log(token);
    //   config.headers.Authorization = "Bearer " + token;
    // }
    // if (config.method === "GET") {
    //   let openId = wx.getStorageSync("openId");
    //   config.headers["openId"] = openId;
    // }
    // if (config.method === "POST") {
    //   let openId = wx.getStorageSync("openId");
    //   config.headers["openId"] = openId;
    // }
    // return config;
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
        success: res => {
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

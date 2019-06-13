var Fly=require("flyio/dist/npm/wx")
let fly=new Fly;
// 创建axios实例

fly.baseURL =  'http://192.168.0.16:8003';
  // timeout: 10000 // 请求超时时间

// request拦截器
fly.interceptors.request.use(
  config => {
    console.log(config);
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

export default fly;

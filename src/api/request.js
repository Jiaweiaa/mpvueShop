let Fly=require("flyio/dist/npm/wx");
let fly=new Fly;
fly.config.baseURL="http://47.104.173.227:8003";
// fly.config.withCredentials = true //允许携带cookie
fly.interceptors.request.use((config) => {
  console.log(config);
  if(wx.getStorageSync("g_i")!=""){
    config.headers={
      'cookie':wx.getStorageSync("g_i")//读取cookie
    }
    // console.log(wx.getStorageSync("g_i"));
  }
  if(config.method  === 'GET'){
    let openId = wx.getStorageSync('openId');
    config.headers['openId'] = openId;
  }
  if(config.method  === 'POST'){
    let openId = wx.getStorageSync('openId');
    config.headers['openId'] = openId;
    config.headers.Authorization = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbIioiXSwibG9naW5OYW1lIjoiYWRtaW4iLCJleHAiOjE1NjE0NDIxODcsImp0aSI6IjRlZDNkNTcyLWJmMzUtNDYwOS1hNTdkLTdhZmNkODI1MTQ2YiIsImNsaWVudF9pZCI6ImNsb3VkbWFsbC1jbGllbnQtYmFzaWMtYXV0aCIsInRpbWVzdGFtcCI6MTU2MDU3ODE4Nzk0NX0.3SyQSUj9pxJHgTEir-26FhJ7AZdF2OiGk_g-fUKHhsE";
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


export default fly;

let Fly=require("flyio/dist/npm/wx");
let fly=new Fly;
fly.config.baseURL="http://192.168.0.10:8003";
// http://47.104.173.227:8003
//
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
    config.headers.Authorization = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzg0MjcwNjQ3NyIsInNjb3BlIjpbIioiXSwibG9naW5OYW1lIjoiMTM4NDI3MDY0NzciLCJleHAiOjE1NjEwMDMwNzcsImp0aSI6IjM2ZDQwNTJmLWU2NTItNDVjOC04ZDdmLWE4YzJmZjM3NjUxOCIsImNsaWVudF9pZCI6ImNsb3VkbWFsbC1jbGllbnQtYmFzaWMtYXV0aCIsInRpbWVzdGFtcCI6MTU2MDEzOTA3NzAyN30.WEL2Wa7XgOxBYj8-JdDybsLXwyDAQ2qWNP5E04gx5GU";
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


export default fly;

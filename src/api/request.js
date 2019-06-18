let Fly=require("flyio/dist/npm/wx");
let fly=new Fly;
fly.config.baseURL=" http://192.168.3.29:8003";
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
    config.headers.Authorization = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzA4MjIyNzY1NyIsInNjb3BlIjpbIioiXSwibG9naW5OYW1lIjoiMTMwODIyMjc2NTciLCJleHAiOjE1NjE3MjMwNjMsImp0aSI6ImI3NWI0OWE1LWMxODctNGFlYS1iYWM3LWViNTc2M2M4YzY2YiIsImNsaWVudF9pZCI6ImNsb3VkbWFsbC1jbGllbnQtYmFzaWMtYXV0aCIsInRpbWVzdGFtcCI6MTU2MDg1OTA2MzYzNH0.a20reEoezYMRdTlt7b7i6zqFyEaLUJ_D7hAfc2cwLvE";
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


export default fly;

let Fly=require("flyio/dist/npm/wx");
let fly=new Fly;
fly.config.baseURL="http://47.104.173.227:8003";
// http://47.104.173.227:8003
//
// fly.config.withCredentials = true //允许携带cookie
fly.interceptors.request.use((config) => {
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
    config.headers.Authorization = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzA4MjIyNzY1NyIsInNjb3BlIjpbIioiXSwibG9naW5OYW1lIjoiMTMwODIyMjc2NTciLCJleHAiOjE1NjE3NzM0ODAsImp0aSI6ImJhODY1MzhlLTQxZDgtNDA1Mi1iOGI3LTRmYmJkZGIxNjM5OCIsImNsaWVudF9pZCI6ImNsb3VkbWFsbC1jbGllbnQtYmFzaWMtYXV0aCIsInRpbWVzdGFtcCI6MTU2MDkwOTQ4MDcwN30.C-T3iLu_MUrMz_JlOPwnbEMroZj68SvdznkQ48Csm3U";
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


export default fly;

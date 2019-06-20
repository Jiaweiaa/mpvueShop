let Fly=require("flyio/dist/npm/wx");
let fly=new Fly;
fly.config.baseURL=" http://192.168.0.10:8003";
// http://47.104.173.227:8003
//
// fly.config.withCredentials = true //允许携带cookie
fly.interceptors.request.use((config) => {
  if(wx.getStorageSync("g_i")!=""){
    config.headers={
      'cookie':wx.getStorageSync("g_i"),
      'cookie':'xiaowei:123'//读取cookie
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
    config.headers.Authorization = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMzg0MjcwNjQ3NyIsInNjb3BlIjpbIioiXSwibG9naW5OYW1lIjoiMTM4NDI3MDY0NzciLCJleHAiOjE1NjE4ODQ4NTksImp0aSI6Ijg4ZTJmNjJlLTE5Y2ItNGQ4NS04OWRjLTkyMDQ1Mjc2MThlYSIsImNsaWVudF9pZCI6ImNsb3VkbWFsbC1jbGllbnQtYmFzaWMtYXV0aCIsInRpbWVzdGFtcCI6MTU2MTAyMDg1OTExOX0.hwRiHCGcH2NgZ5Ajai5J6f6l3LkdDmpOudeQ-ic99TA";
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


export default fly;

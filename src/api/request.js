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
    config.headers.Authorization = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbIioiXSwibG9naW5OYW1lIjoiYWRtaW4iLCJleHAiOjE1NjEyNzg5MjksImp0aSI6ImNjMjM2M2EwLTRmZDktNGU1YS1hMzczLTM4NWY4ODcwZTc5ZCIsImNsaWVudF9pZCI6ImNsb3VkbWFsbC1jbGllbnQtYmFzaWMtYXV0aCIsInRpbWVzdGFtcCI6MTU2MDQxNDkyOTc0OH0.fLLJVy6xXQC86au5qnwJVQK17sa6brCJzy8NQp8DvQI";
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


export default fly;

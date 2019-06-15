let Fly=require("flyio/dist/npm/wx");
let fly=new Fly;
fly.config.baseURL="http://192.168.3.59:8003";
// http://47.104.173.227:8003
// http://192.168.0.10:8003
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
    config.headers.Authorization = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJqMTIzNDU2Iiwic2NvcGUiOlsiKiJdLCJsb2dpbk5hbWUiOiJqMTIzNDU2IiwiZXhwIjoxNTYxNDU3OTM1LCJqdGkiOiJkZjBiMWVkMy01NjIxLTQ1OWYtYmQ0Mi01NjFhMTFiODJmMmUiLCJjbGllbnRfaWQiOiJjbG91ZG1hbGwtY2xpZW50LWJhc2ljLWF1dGgiLCJ0aW1lc3RhbXAiOjE1NjA1OTM5MzU3Njh9.kjt4PVGkZquOOJzl6gqIKP9-YeGDn4i78uMKEF0U3uA"
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


export default fly;

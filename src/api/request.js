let Fly=require("flyio/dist/npm/wx");
let fly=new Fly;
fly.config.baseURL=" http://192.168.0.8:8003";
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
    config.headers.Authorization = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxODYyMTUzMzMzMiIsInNjb3BlIjpbIioiXSwibG9naW5OYW1lIjoiMTg2MjE1MzMzMzIiLCJleHAiOjE1NjE5Nzc4ODYsImF1dGhvcml0aWVzIjpbIi9tb2RpZnlVc2VyU3RhdHVzQnlJZCIsIi9lZGl0Um9sZSIsIi9zYXZlUm9sZSIsIi9nZXRBY3Rpb25UcmVlQnlSb2xlSWQiLCIvc2F2ZU1lbnUiLCIvZ2V0QWN0aW9uVW5kZXJNZW51IiwiL3VzZXJCaW5kUm9sZSIsIi9nZXRNZW51VHJlZUJ5Um9sZUlkIiwiL2RlbGV0ZU1lbnVCeUlkIiwiL2VkaXRNZW51IiwiL2RlbGV0ZVVzZXJCeUlkIiwiL3VwZGF0ZVVzZXIiLCIvZGVsZXRlUm9sZUJ5SWQiLCIvc2F2ZU9yVXBkYXRlVXNlciJdLCJqdGkiOiI1ZDFjZGU3MC01MDk1LTQxOWEtOTA2ZC0yMDE2ODU2MzEzZjIiLCJjbGllbnRfaWQiOiJjbG91ZG1hbGwtY2xpZW50LWJhc2ljLWF1dGgiLCJ0aW1lc3RhbXAiOjE1NjExMTM4ODYyNDR9.A5FcrjFJ7ZuesZ1rDigA5Ku-a6V_R_ZkOhkdwzcDKgg";
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


export default fly;

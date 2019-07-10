function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function formatTime(getDate) {
  const date = new Date(getDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join("-");
  const t2 = [hour, minute, second].map(formatNumber).join(":");

  const arr = {
    year: t1,
    hours: t2
  };
  return arr;
}

//-------------------------------------------------------------------------请求的封装

const host = "https://www.heyuhsuo.xyz/heyushuo";
export { host };
//请求封装
function request(url, method, data, header = {}) {
  wx.showLoading({
    title: "加载中" //数据请求前loading
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url, //仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        "content-type": "application/json" // 默认值
      },
      success: function(res) {
        wx.hideLoading();
        resolve(res.data);
      },
      fail: function(error) {
        wx.hideLoading();
        reject(false);
      },
      complete: function() {
        wx.hideLoading();
      }
    });
  });
}
export function get(url, data) {
  return request(url, "GET", data);
}
export function post(url, data) {
  return request(url, "POST", data);
}

//-------------------------------------------------------------------------请求的封装

//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------

export function toLogin() {
  const userInfo = wx.getStorageSync("userInfo");
  if (!userInfo) {
    wx.navigateTo({
      url: "/pages/login/main"
    });
  } else {
    return true;
  }
}

export function login() {
  const userInfo = wx.getStorageSync("userInfo");
  if (userInfo) {
    return userInfo;
  }
}

//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------

export function getStorageOpenid() {
  const openId = wx.getStorageSync("openId");
  if (openId) {
    return openId;
  } else {
    return "";
  }
}

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
export function numMulti(num1, num2) {
  var baseNum = 0;
  try {
    baseNum += num1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    baseNum += num2.toString().split(".")[1].length;
  } catch (e) {}
  return (
    Number(num1.toString().replace(".", "")) *
    Number(num2.toString().replace(".", "")) /
    Math.pow(10, baseNum)
  );
}

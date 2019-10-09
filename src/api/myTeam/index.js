/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 11:26:21
 * @LastEditTime: 2019-09-30 15:10:43
 * @LastEditors: Please set LastEditors
 */
import fly from '../request';
let querystring = require("querystring");
let deviceId = new Date().getTime();

// 我的信息
export const myDetile = params => {
  return fly.request({
    url: `/basic/memRelationShip/myRelationInfo`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};
// 总量信息
export const myAgentData = params => {
  return fly.request({
    url: `/basic/memRelationShip/myAgentData`,
    method: "post",
    body: params,
    headers: {
      "Content-Type": "application/json"
    },
  });
};
//扫码核销
export const writeOffByQRcode = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/ActOrd/writeOffByQRcode`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

// 获取所有订单
export const findAllCapOrders = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/trade/ActOrd/findAllCapOrders`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

//团长佣金排行表
export const getCaptainPageByCommission = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/shop/froCaptain/getCaptainPageByCommission`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

// 编辑 团长信息
export const udpateCaptain = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/shop/froCaptain/udpateCaptain`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

// 佣金记录列表
export const getMemRelationshipRecordingByMemberId = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/basic/memRelationshipRecording/getMemRelationshipRecordingByMemberId`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

// 用户提现记录
export const getMemWithdrawRecordingByMemberId = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/basic/memRelationshipRecording/getMemWithdrawRecordingByMemberId`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};

// 提现
export const applyForCommission = params => {
  let data = querystring.encode(params);
  return fly.request({
    url: `/basic/memRelationshipRecording/applyForCommission`,
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });
};


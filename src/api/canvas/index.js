import fly from '../request';

// 列表
export const getMemberHeadAndLevel = params => {
  return fly.request({
    url: `/basic/member/getMemberHeadAndLevel`,
    method: "post",
    body: params,
    headers: {
      "content-type": "application/json"
    },
  });
};


var code = {// logic status code cache from server!
  ERROR:0, // 失败
  SUCCESS:100000, // 成功
  PARAMS_ERROR:100002, // 参数有误
  DATA_ERROR:100003, // 数据有误
  PERMISSION_DENIED:100004, // 没有权限
  ALREADY_EXIST:100005, // 已存在
  USER_NOT_LOGIN:101000, // 没有登录
  WEIXIN_USER_NOT_LOGIN:102000, // 没有微信授权
};
exports.code = code;
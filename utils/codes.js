module.exports = {
  // 成功类
  SUCCESS: 0,

  // 通用错误
  FAIL: -1,
  PARAM_ERROR: 10001, // 参数错误（必填缺失、格式错误等）
  ILLEGAL_REQUEST: 10002, // 非法请求（签名错误、请求方式不对）
  BUSINESS_FAIL: 10003, // 业务处理失败（如余额不足、库存不足）

  // 用户 / 权限
  UNAUTHORIZED: 20001, // 未登录 / token 过期
  FORBIDDEN: 20002,    // 没有权限
  ACCOUNT_DISABLED: 20003, // 账号被冻结

  // 系统类
  SERVER_ERROR: 30001, // 服务异常
  DB_ERROR: 30002, // 数据库错误
  THIRD_PARTY_ERROR: 30003, // 第三方服务异常（邮件、短信失败等）
};
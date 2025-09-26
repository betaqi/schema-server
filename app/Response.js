


module.exports = class Response {

  static newSuccess(ctx, data = null, code = 0, message = 'success', status = 200) {
    ctx.status = status;
    ctx.body = {
      code,
      data,
      message
    }
  }

  static newFail(ctx, data = null, code = -1, message = 'error', status = 500) {
    ctx.status = status;
    ctx.body = {
      code,
      data,
      message
    }
  }

  //  服务异常错误
  static newServiceFail(ctx, data = null, code = 3000, message = 'service error', status = 200) {
    ctx.status = status;
    ctx.body = {
      code,
      data,
      message
    }
  }

  // 签名错误
  static newSignature(ctx, data = null, code = 10002, message = 'signature not correct', status = 200) {
    ctx.status = status;
    ctx.body = {
      code,
      data,
      message
    }
  }
}
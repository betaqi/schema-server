const crypto = require("crypto");

const Response = require('../Response');

module.exports = (app) => async (ctx, next) => {
  const { path, method } = ctx;

  // 不是api请求或本地环境 绕过签名
  if (!path.includes('/api') || app.envFn.isLocal()) return await next();

  const { header } = ctx.request;

  const st = header['s-t']
  const sSign = header['s-sign']
  const singKey = 'SDshA8cyfOEntry9zj63y';

  if (!st || !sSign) {
    Response.newSignature(ctx);
    app.logger.info(`${ method } ${ path } missing headers s-t or s-sign`);
    return;
  }

  const stNum = Number(st);
  if (!Number.isFinite(stNum)) {
    Response.newSignature(ctx);
    app.logger.info(`${ method } ${ path } invalid s-t: ${ String(st) }`);
    return;
  }

  const signature = crypto
  .createHmac("sha256", Buffer.from(singKey, "utf8"))
  .update(Buffer.from(String(st), "utf8"))
  .digest('hex');

  if (
    signature !== sSign ||
    Date.now() - stNum > 600000
  ) {
    Response.newSignature(ctx);
    app.logger.info(`${ method } ${ path } signature:${ signature }`);
    return;
  }

  await next();
}

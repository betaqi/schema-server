const crypto = require("crypto");

const Response = require('../Response');

module.exports = (app) => async (ctx, next) => {
  if (!ctx.path.includes('/api')) return await next();

  const { path, method } = ctx;
  const { header } = ctx.request;

  const st = header['s-t']
  const sSign = header['s-sign']
  const singKey = 'SDshA8cyfOEntry9zj63y';

  const signature = crypto
  .createHmac("sha256", Buffer.from(singKey, "utf8"))
  .update(Buffer.from(st, "utf8"))
  .digest('hex');

  if (
    !sSign || !st ||
    signature !== sSign ||
    Date.now() - Number(st) > 600000
  ) {
    Response.newSignature(ctx);
    app.logger.info(`${ method } ${ path } signature:${ signature }`);
    return;
  }

  await next();
}

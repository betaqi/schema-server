const Response = require('../Response');
const codes = require('../../utils/codes')
const Ajv = require("ajv")
module.exports = (app) => async (ctx, next) => {
  const { path, method, params } = ctx;
  if (!path.includes('/api')) return await next();

  const ajv = new Ajv({ allErrors: true, coerceTypes: true });
  const { body, query } = ctx.request;

  const schema = app.routerSchema[path]?.[method] ?? undefined;
  if (!schema) return await next();


  if (schema.body && !validateSchema("Body", schema.body, body, 4001)) return;

  if (schema.query && !validateSchema("Query", schema.query, query, 4002)) return;

  if (schema.params && !validateSchema("Params", schema.params, params, 4003)) return;

  function validateSchema(type, schemaDef, data, errorCode) {
    const validate = ajv.compile(schemaDef);
    const valid = validate(data);
    if (!valid) {
      const errors = validate.errors[0]
      const message = `${ type } 参数校验失败:${ errors.instancePath.replace('/', '') } ${ errors.message }`
      Response.newFail(ctx, null, codes.PARAM_ERROR, message);
      app.logger.error(`[params-exception] ${ message }`)
      return false;
    }
    return true;
  }

  await next();
}



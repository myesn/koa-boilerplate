import Koa, { Next } from "koa";
import qs from "qs";

// https://github.com/ljharb/qs#parsing-primitivescalar-values-numbers-booleans-null-etc
// koa 的 ctx.request.query 对象中字段的值只会是 string 类型，通过以下方式转换为实际类型
export default () => async (ctx: Koa.ExtendableContext, next: Next) => {
  // @ts-ignore
  const qq = qs.parse(ctx.request.querystring, {
    decoder(str, decoder, charset) {
      const strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }

      if (/^(\d+|\d*\.\d+)$/.test(str)) {
        return parseFloat(str);
      }

      const keywords = {
        true: true,
        false: false,
        null: null,
        undefined,
      };
      if (str in keywords) {
        // @ts-ignore
        return keywords[str];
      }

      // utf-8
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    },
  });
  // @ts-ignore
  Object.assign(ctx.request.query, qq);
  // console.log("queryTypes middleware", ctx.request.query);

  await next();
};

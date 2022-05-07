import { Next } from "koa";
import qs from "qs";
import { KoaCustomAppContext } from "../project";

// https://github.com/ljharb/qs#parsing-primitivescalar-values-numbers-booleans-null-etc
// koa 的 ctx.request.query 对象中字段的值只会是 string 类型，通过以下方式转换为实际类型
export default () => async (ctx: KoaCustomAppContext, next: Next) => {
  // 有些时候会把字符串转为数字，比如 qrCode=001，得到的结果为 qrCode=1，所以对于一些路径需要跳过此中间件的处理
  const ignorePaths = ["/api/open/mobile-care/patient/detail-simple"];
  if (ignorePaths.some((x) => ctx.request.path.startsWith(x))) {
    await next();
    return;
  }

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

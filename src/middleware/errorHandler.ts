import { Next } from "koa";
import { KoaCustomAppContext } from "../project";

export default () => async (ctx: KoaCustomAppContext, next: Next) => {
  try {
    await next();
  } catch (err: any) {
    // console.error(err);
    // will only respond with JSON
    // ctx.status = err.statusCode || err.status || 400;
    if (err.status === 401) {
      ctx.status = err.status;
      ctx.body = "";
    } else {
      ctx.status = 400;
      ctx.body = {
        message: err.message,
      };
    }
  }
};

import Koa from "koa";

function ok(ctx: Koa.DefaultContext): void {
  ctx.status = 200;
  ctx.body = "";
}

export default { ok };

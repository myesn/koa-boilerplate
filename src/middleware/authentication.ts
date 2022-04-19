import { Next } from "koa";
import { requestUtils } from "../utils";
// import { AuthenticationClient } from "../service";
import { KoaCustomAppContext } from "../project";

/** 需要自己实现 */
class AuthenticationClient {
  async findByToken(token: string) {
    return Promise.resolve({ id: "" });
  }
}

const authenticationClient = new AuthenticationClient();

function isMatchIgnoreAuthorizationEndpoints(ctx: KoaCustomAppContext) {
  const ignoredUrls: string[] = [];

  return ignoredUrls.some((ignoredUrl) =>
    ctx.request.path.startsWith(ignoredUrl)
  );
}

export default () => async (ctx: KoaCustomAppContext, next: Next) => {
  // skip authorization urls
  if (isMatchIgnoreAuthorizationEndpoints(ctx)) {
    await next();
    return;
  }

  const token = requestUtils.getToken(ctx);
  if (!token) {
    ctx.throw(401);
    return;
  }

  const account = await authenticationClient.findByToken(token);
  if (!account) {
    ctx.throw(401);
    return;
  }

  ctx.state.user = account;

  await next();
};

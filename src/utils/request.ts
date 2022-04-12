import { KoaCustomAppContext } from "../project";

export default {
  getToken(ctx: KoaCustomAppContext) {
    let token = ctx.request.header["authorization"];
    if (token) {
      return token;
    }

    token = ctx.request.query.token as string;
    if (token) {
      return token;
    }

    return null;
  },
};

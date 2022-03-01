import { schemaUtils, responseUtils } from "../utils";
import CommonService from "../service/common";
import { DefaultSchema, KoaCustomAppContext } from "../project";

export default class CommonController<TService extends CommonService> {
  constructor(protected service: TService, protected schema?: DefaultSchema) {}

  async list(ctx: KoaCustomAppContext) {
    const { query } = ctx.request;

    ctx.body = await this.service.paging({}, query);
  }

  async find(ctx: KoaCustomAppContext) {
    const { query } = ctx.request;
    const { id } = query;

    schemaUtils.check(query, this.schema?.find);

    ctx.body = await this.service.findById(<string>id);
  }

  async create(ctx: KoaCustomAppContext) {
    const { body } = ctx.request;

    schemaUtils.check(body, this.schema?.create);
    await this.service.create(body);

    responseUtils.ok(ctx);
  }

  async update(ctx: KoaCustomAppContext) {
    const { body } = ctx.request;
    schemaUtils.check(body, this.schema?.update);

    const { id, ...props } = body;
    await this.service.updateById(id, props);

    responseUtils.ok(ctx);
  }

  async delete(ctx: KoaCustomAppContext) {
    const { body } = ctx.request;
    schemaUtils.check(body, this.schema?.delete);

    const { id } = body;
    await this.service.deleteById(id);

    responseUtils.ok(ctx);
  }
}

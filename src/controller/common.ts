import Koa from "koa";
import { schemaUtils, responseUtils } from "../utils";
import CommonService from "../service/common";
import { DefaultSchema } from "../project";

export default class CommonController {
  constructor(
    protected service: CommonService,
    protected schema?: DefaultSchema
  ) {}

  async list(ctx: Koa.ExtendableContext) {
    const { query } = ctx.request;

    ctx.body = await this.service.list(query);
  }

  async find(ctx: Koa.ExtendableContext) {
    const { query } = ctx.request;
    const { id } = query;

    schemaUtils.check(query, this.schema?.find);

    ctx.body = await this.service.findById(<string>id);
  }

  async create(ctx: Koa.ExtendableContext) {
    const { body } = ctx.request;

    schemaUtils.check(body, this.schema?.create);
    await this.service.create(body);

    responseUtils.ok(ctx);
  }

  async update(ctx: Koa.ExtendableContext) {
    const { body } = ctx.request;
    schemaUtils.check(body, this.schema?.update);

    const { id, ...props } = body;
    await this.service.updateById(id, props);

    responseUtils.ok(ctx);
  }

  async delete(ctx: Koa.ExtendableContext) {
    const { body } = ctx.request;
    schemaUtils.check(body, this.schema?.delete);

    const { id } = body;
    await this.service.deleteById(id);

    responseUtils.ok(ctx);
  }
}

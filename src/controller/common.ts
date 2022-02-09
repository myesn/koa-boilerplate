import Koa from "koa";
import { schemaUtils, responseUtils } from "../utils";
import CommonService from "../service/common";
import { DefaultSchema } from "../project";

export default class CommonController {
  constructor(
    protected service: CommonService,
    protected schema: DefaultSchema
  ) {}

  async list(ctx: Koa.ExtendableContext) {
    const { query } = ctx.request;

    ctx.body = await this.service.list(query);
  }

  async find(ctx: Koa.ExtendableContext) {
    const { query } = ctx.request;
    const { id } = query;

    schemaUtils.check(this.schema.find, query);

    ctx.body = await this.service.findById(<string>id);
  }

  async create(ctx: Koa.ExtendableContext) {
    const { body } = ctx.request;

    schemaUtils.check(this.schema.create, body);
    await this.service.create(body);

    responseUtils.ok(ctx);
  }

  async update(ctx: Koa.ExtendableContext) {
    const { body } = ctx.request;
    schemaUtils.check(this.schema.update, body);

    const { id, ...props } = body;
    await this.service.updateById(id, props);

    responseUtils.ok(ctx);
  }

  async delete(ctx: Koa.ExtendableContext) {
    const { body } = ctx.request;
    schemaUtils.check(this.schema.delete, body);

    const { id } = body;
    await this.service.deleteById(id);

    responseUtils.ok(ctx);
  }
}

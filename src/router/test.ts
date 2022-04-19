import Koa from "koa";
import Router from "@koa/router";
import { TestController } from "../controller";
import { KoaCustomAppContext, KoaCustomAppState } from "../project";

const router = new Router();
const controller = new TestController();

export default (app: Koa<KoaCustomAppState, KoaCustomAppContext>) => {
  router.prefix("/api/test");

  router.get("/list", controller.list.bind(controller));
  router.get("/find", controller.find.bind(controller));
  router.post("/create", controller.create.bind(controller));
  router.post("/update", controller.update.bind(controller));
  router.post("/delete", controller.delete.bind(controller));

  app.use(router.routes()).use(router.allowedMethods());
};

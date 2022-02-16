import Router from "@koa/router";
import { TestController } from "../controller";
import Koa from "koa";

const router = new Router();
const controller = new TestController();

export default (app: Koa) => {
  router.prefix("/api/test");

  router.get("/list", controller.list.bind(controller));
  router.get("/find", controller.find.bind(controller));
  router.post("/create", controller.create.bind(controller));
  router.post("/update", controller.update.bind(controller));
  router.post("/delete", controller.delete.bind(controller));

  app.use(router.routes()).use(router.allowedMethods());
};
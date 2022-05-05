import "dotenv/config";
import consola from "consola";
import Koa from "koa";
import cors from "@koa/cors";
import json from "koa-json";
import logger from "koa-logger";
import bodyParser from "koa-body";
import queryTypes from "./middleware/queryTypes";
import errorHandler from "./middleware/errorHandler";
import authentication from "./middleware/authentication";

import routerArray from "./router";
import { KoaCustomAppContext, KoaCustomAppState } from "./project";
import { tempDirectory } from "./constant";
import { fileUtils } from "./utils";

fileUtils.createDirectory(tempDirectory);

const app = new Koa<KoaCustomAppState, KoaCustomAppContext>();
const port = process.env.PORT;

// middlewares
app.use(errorHandler());

if (process.env.NODE_ENV === "development") {
  app.use(logger());
}

app.use(cors());
app.use(authentication());
app.use(
  bodyParser({
    multipart: true,
    formidable: {
      uploadDir: tempDirectory,
    },
    onError: (err, ctx) => ctx.throw("传递了无法解析的参数"),
  })
);
app.use(json());
app.use(queryTypes());

routerArray.forEach((router) => router(app));

app.listen(port, () => {
  consola.info(
    `Node.js v${process.versions.node}  Environment: ${process.env.NODE_ENV}`
  );
  consola.success(
    `${process.env.APP_NAME} Server running at http://localhost:${port}`
  );
});

// error-handling
app.on("error", (err, ctx) => {
  consola.error("Server error", err, ctx);
});

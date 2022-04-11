import "dotenv/config";
import path from "path";
import Koa from "koa";
import cors from "@koa/cors";
import json from "koa-json";
import logger from "koa-logger";
import bodyParser from "koa-body";
import queryTypes from "./middleware/queryTypes";

import routerArray from "./router";
import { KoaCustomAppContext, KoaCustomAppState } from "./project";

const app = new Koa<KoaCustomAppState, KoaCustomAppContext>();
const port = process.env.PORT;

// middlewares
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    // will only respond with JSON
    // ctx.status = err.statusCode || err.status || 400;
    ctx.status = 400;
    ctx.body = {
      message: err.message,
    };
  }
});

app.use(logger());
app.use(cors());
app.use(
  bodyParser({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "/assets"),
    },
    onError: (err, ctx) => ctx.throw("传递了无法解析的参数"),
  })
);
app.use(json());
app.use(queryTypes());

routerArray.forEach((router) => router(app));

app.listen(port, () => {
  console.log(
    `Node.js v${process.versions.node}  Environment: ${process.env.NODE_ENV}`
  );
  console.log(`Server running at http://localhost:${port}`);
});

// error-handling
app.on("error", (err, ctx) => {
  console.error("Server error", err, ctx);
});

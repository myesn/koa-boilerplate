import { Buffer } from "exceljs";
import { KoaCustomAppContext } from "../project";

/** 响应状态码 200 的任意返回值（默认 ""） */
function ok(ctx: KoaCustomAppContext, body: any = ""): void {
  ctx.status = 200;
  ctx.body = body;
}

/** 响应状态码 200 的 excel 文件 buffer */
function excel(
  ctx: KoaCustomAppContext,
  downloadFileName: string,
  excelWorkbookBuffer: Buffer
) {
  setDownloadFileHeader(ctx, FileContentTypeKind.excel, downloadFileName);
  ok(ctx, excelWorkbookBuffer);
}

/** 响应状态码 200 的任意文件流下载 */
function file(
  ctx: KoaCustomAppContext,
  contentType: string,
  downloadFileName: string,
  stream: any
) {
  setDownloadFileHeader(ctx, contentType, downloadFileName);
  ok(ctx, stream);
}

function setHeader(
  ctx: KoaCustomAppContext,
  field: string,
  val: string | string[]
) {
  ctx.set(field, val);
}

function setHeaders(
  ctx: KoaCustomAppContext,
  headers: { [key: string]: string | string[] }
) {
  Object.entries(headers).forEach(([field, val]) => {
    setHeader(ctx, field, val);
  });
}

/**　设置下载文件时所属的响应头 */
function setDownloadFileHeader(
  ctx: KoaCustomAppContext,
  kind: FileContentTypeKind | string,
  downloadFileName: string
) {
  setHeaders(ctx, {
    "Content-Type": kind,
    "Content-Disposition":
      "attachment; filename=" + encodeURIComponent(downloadFileName), // 中文需要编码，否则会报错
  });
}

export enum FileContentTypeKind {
  excel = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
}

export default {
  ok,
  excel,
  file,
  setHeader,
  setHeaders,
  setDownloadFileHeader,
};

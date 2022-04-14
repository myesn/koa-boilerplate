import fs from "fs";
import mime from "mime-types";

function deleteFile(path: string): void {
  fs.unlinkSync(path);
}

export default {
  createDirectory(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  },
  deleteFile,
  deleteFiles(paths: string[]): void {
    paths.forEach((path) => deleteFile(path));
  },
  deleteDirectory(dir: string): void {
    fs.rmSync(dir, { recursive: true, force: true });
  },
  moveFile(oldPath: string, newPath: string): void {
    fs.renameSync(oldPath, newPath);
  },
  getFileExtension(fileName: string): string {
    if (!fileName) {
      throw new Error("文件名称不能为空");
    }

    if (!fileName.includes(".")) {
      throw new Error("文件名称不能没有后缀名");
    }

    const latestDotPosition = fileName.lastIndexOf(".");
    return fileName.substring(latestDotPosition);
  },
  getFileContentType(filenameOrExt: string): string {
    const contentType = mime.contentType(filenameOrExt);
    if (contentType === false) {
      throw new Error(`找不到文件名 ${filenameOrExt} 的 Content-Type`);
    }

    return contentType;
  },
  getFiles(directory: string): string[] {
    return fs.readdirSync(directory);
  },
  createReadStream(path: string) {
    return fs.createReadStream(path);
  },
};

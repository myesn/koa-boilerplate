import path from "node:path";
import { fileURLToPath } from "node:url";

// https://docs.joshuatz.com/cheatsheets/node-and-npm/node-esm/#nodejs-built-ins-and-global-objects
export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const assetDirectory = path.join(__dirname, "..", "/assets");
export const tempDirectory = path.join(assetDirectory, "temp");

export const collectionName = {
  test: "tests",
};

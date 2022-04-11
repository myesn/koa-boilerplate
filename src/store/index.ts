import { Collection, Db, MongoClient } from "mongodb";
import { Document } from "bson";

if (!process.env.MONGODB_URL) {
  throw new Error("缺少数据库连接地址信息");
}

const client = new MongoClient(process.env.MONGODB_URL);

console.log("connecting to mongodb..");
client.connect((error) => {
  if (error) {
    console.error("connecting error to mongodb..");
  }

  console.log("connected to mongodb..");
});
export async function toDb<TSchema extends Document = Document>(): Promise<Db> {
  return Promise.resolve(client.db());
}

export async function toCollection<TSchema extends Document = Document>(
  name: string
): Promise<Collection<TSchema>> {
  return Promise.resolve(client.db().collection<TSchema>(name));
}

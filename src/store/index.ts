import { Collection, Db, MongoClient } from "mongodb";
import { Document } from "bson";

const url = "mongodb://localhost:27017/demo2";
const client = new MongoClient(url);

export async function toDB(): Promise<Db> {
  await client.connect();
  return client.db();
}

export async function toCollection<TSchema extends Document = Document>(
  name: string
): Promise<Collection<TSchema>> {
  const db = await toDB();
  return db.collection(name);
}

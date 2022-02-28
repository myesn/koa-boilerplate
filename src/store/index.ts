import { Collection, Db, MongoClient } from "mongodb";
import { Document } from "bson";

const url = "mongodb://localhost:27017/hospital-next";
const client = new MongoClient(url);

console.log("connecting to mongodb..");
client.connect((error) => {
  if (error) {
    console.error("connecting error to mongodb..");
  }

  console.log("connected to mongodb..");
});

export async function toCollection<TSchema extends Document = Document>(
    name: string
): Promise<Collection<TSchema>> {
  return Promise.resolve(client.db().collection(name));
}

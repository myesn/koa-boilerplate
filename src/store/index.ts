import { Collection, Db, MongoClient, Document } from "mongodb";
import consola from "consola";

const database = process.env.MONGODB_DATABASE;
const client = await connect();

async function connect() {
  const authDb = "admin";
  const {
    MONGODB_CLUSTER_URL: clusterUrl,
    MONGODB_DATABASE: database,
    MONGODB_USERNAME: username,
    MONGODB_PASSWORD: password,
  } = process.env;

  if (!clusterUrl || !database || !username || !password) {
    throw new Error("缺少数据库连接地址信息");
  }

  const auth = {
    username: encodeURIComponent(username),
    password: encodeURIComponent(password),
  };

  const url = `mongodb://${auth.username}:${auth.password}@${clusterUrl}/${authDb}`;
  // const url = `mongodb://${clusterUrl}/${database}`;
  const client = new MongoClient(url, {
    connectTimeoutMS: 5000,
    // auth,
  });

  try {
    consola.info("connecting to mongodb..");

    await client.connect();
    await client.db().command({ ping: 1 });

    consola.success("connected successfully to mongodb..");

    return client;
  } catch (e) {
    consola.error("connect error to mongodb: ", e);
    throw e;
  }
  // finally {
  //   await client.close();
  // }
}

export async function toClient() {
  return Promise.resolve(client);
}

export async function toDb<TSchema extends Document = Document>(): Promise<Db> {
  return Promise.resolve(client.db(database));
}

export async function toCollection<TSchema extends Document = Document>(
  name: string
): Promise<Collection<TSchema>> {
  const db = await toDb();
  return Promise.resolve(db.collection<TSchema>(name));
}

import { toCollection } from "../store";
import { mongodbUtils } from "../utils";
import { ObjectId, WithId } from "mongodb";
import { Document } from "bson";
import { PagerParam, PagerResult } from "../project";

export default class CommonService<TEntity = any> {
  constructor(protected collectionName: string) {}

  async list(param?: PagerParam): Promise<PagerResult<TEntity>> {
    const collection = await toCollection(this.collectionName);
    const total = await collection.countDocuments();
    const rows = await collection
        .find(
            {},
            {
              ...param,
            }
        )
        .toArray();
    const items = rows.map((row) => <any>this.mapRowId(row));

    return {
      total,
      items,
    };
  }

  async simpleList(): Promise<TEntity[]> {
    const collection = await toCollection(this.collectionName);
    const rows = await collection.find().toArray();

    return rows.map((row) => <any>this.mapRowId(row));
  }

  async simpleListByFilter(filter: Document): Promise<TEntity[]> {
    const collection = await toCollection(this.collectionName);
    const rows = await collection.find(filter).toArray();

    return rows.map((row) => <any>this.mapRowId(row));
  }

  async count(): Promise<number> {
    const collection = await toCollection(this.collectionName);
    return await collection.countDocuments();
  }

  async countByFilter(filter: Document): Promise<number> {
    const collection = await toCollection(this.collectionName);
    return await collection.countDocuments(filter);
  }

  async find(filter: Document): Promise<TEntity | null> {
    const collection = await toCollection(this.collectionName);
    const row = await collection.findOne(filter);
    if (!row) {
      return null;
    }

    return <any>this.mapRowId(row);
  }

  async findById(id: string | ObjectId): Promise<TEntity | null> {
    const collection = await toCollection(this.collectionName);
    const row = await collection.findOne({
      _id: mongodbUtils.objectId(id),
    });
    if (!row) {
      return null;
    }

    return <any>this.mapRowId(row);
  }

  async create(body: { [key: string]: any }): Promise<ObjectId> {
    const collection = await toCollection(this.collectionName);
    const result = await collection.insertOne(body);

    return result.insertedId;
  }

  async updateById(
      id: string | ObjectId,
      update: { [key: string]: any }
  ): Promise<void> {
    const collection = await toCollection(this.collectionName);
    await collection.updateOne(
        { _id: mongodbUtils.objectId(id) },
        {
          $set: update,
        }
    );
  }

  async deleteById(id: string | ObjectId): Promise<void> {
    const collection = await toCollection(this.collectionName);
    await collection.deleteOne({ _id: mongodbUtils.objectId(id) });
  }

  mapRowId(row: WithId<Document>): { id: ObjectId; [key: string]: any } {
    const { _id, ...props } = row;
    return {
      id: _id,
      ...props,
    };
  }
}

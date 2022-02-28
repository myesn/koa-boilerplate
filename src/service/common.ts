import { Document } from "bson";
import { FindOptions, ObjectId } from "mongodb";
import { toCollection } from "../store";
import { mongodbUtils } from "../utils";
import { PagerParam, PagerResult } from "../project";

export default class CommonService<TEntity = any> {
  constructor(protected collectionName: string) {}

  async getCollection() {
    return await toCollection(this.collectionName);
  }

  async list(param?: PagerParam): Promise<PagerResult<TEntity>> {
    const collection = await this.getCollection();
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
    const collection = await this.getCollection();
    const rows = await collection.find().toArray();

    return rows.map((row) => <any>this.mapRowId(row));
  }

  async simpleListByFilter(filter: Document): Promise<TEntity[]> {
    const collection = await this.getCollection();
    const rows = await collection.find(filter).toArray();

    return rows.map((row) => <any>this.mapRowId(row));
  }

  async count(): Promise<number> {
    const collection = await this.getCollection();
    return await collection.countDocuments();
  }

  async countByFilter(filter: Document): Promise<number> {
    const collection = await this.getCollection();
    return await collection.countDocuments(filter);
  }

  async existsById(id: string | ObjectId): Promise<boolean> {
    const count = await this.countByFilter({ _id: mongodbUtils.objectId(id) });
    return count > 0;
  }

  async existsByFilter(filter: Document): Promise<boolean> {
    const count = await this.countByFilter(filter);
    return count > 0;
  }

  async find(filter: Document, options?: FindOptions): Promise<TEntity | null> {
    const collection = await this.getCollection();
    const row = await collection.findOne(filter, options);
    if (!row) {
      return null;
    }

    return <any>this.mapRowId(row);
  }

  async findById(
      id: string | ObjectId,
      options?: FindOptions
  ): Promise<TEntity | null> {
    const collection = await this.getCollection();
    const row = await collection.findOne(
        {
          _id: mongodbUtils.objectId(id),
        },
        options
    );
    if (!row) {
      return null;
    }

    return <any>this.mapRowId(row);
  }

  async getSingleFieldValueById(id: string | ObjectId, fieldName: string) {
    const row = await this.findById(id, {
      projection: {
        [fieldName]: 1,
      },
    });

    if (!row) {
      throw new Error("未能根据 ID 查找到数据");
    }

    return (<any>row)[fieldName];
  }

  async create(body: { [key: string]: any }): Promise<ObjectId> {
    const collection = await this.getCollection();
    const result = await collection.insertOne(body);

    return result.insertedId;
  }

  async createMany(body: { [key: string]: any }[]): Promise<void> {
    const collection = await this.getCollection();
    await collection.insertMany(body);
  }

  async updateById(
      id: string | ObjectId,
      update: { [key: string]: any }
  ): Promise<void> {
    const collection = await this.getCollection();
    await collection.updateOne(
        { _id: mongodbUtils.objectId(id) },
        {
          $set: update,
        }
    );
  }

  async deleteById(id: string | ObjectId): Promise<void> {
    const collection = await this.getCollection();
    await collection.deleteOne({ _id: mongodbUtils.objectId(id) });
  }

  mapRowId(row: any): { id: ObjectId; [key: string]: any } {
    const { _id, ...props } = row;
    return {
      id: _id,
      ...props,
    };
  }
}

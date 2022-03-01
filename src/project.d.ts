// import { Document } from "bson";
// import {
//   Filter,
//   FindOptions,
//   ObjectId,
//   OptionalUnlessRequiredId,
//   UpdateFilter,
// } from "mongodb";
//
// declare interface Service {
//   list(filter: Filter<Document>, options?: FindOptions): Promise<Document[]>;
//
//   findById(id: string | ObjectId): Promise<Document | null>;
//
//   create(body: OptionalUnlessRequiredId<Document>): Promise<void>;
//
//   updateById(
//     id: string | ObjectId,
//     update: UpdateFilter<Document> | Partial<Document>
//   ): Promise<void>;
//
//   deleteById(id: string | ObjectId): Promise<void>;
// }
//
// declare interface Controller {}

import { ObjectSchema } from "joi";

declare type DefaultSchema = {
  find?: ObjectSchema;
  create?: ObjectSchema;
  update?: ObjectSchema;
  delete?: ObjectSchema;
};

declare type PagingParam = {
  skip?: number;
  limit?: number;
};

declare type PagingResult<TEntity> = {
  total: number;
  items: TEntity[];
};

declare type MongoDBAggregateLookupType = {
  /** 指定要执行联接的同一数据库中的集合 */
  from: string;
  /** 当前集合中的字段名称 */
  localField: string;
  /** from 集合中的字段名称 */
  foreignField: string;
  /** 输出的数组字段名称 */
  as: string;
};

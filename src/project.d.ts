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

declare type PagerParam = {
  skip?: number;
  limit?: number;
};

declare type PagerResult = {
  total: number;
  items: any[];
};

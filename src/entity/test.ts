import { ObjectId } from "mongodb";

export type TestEntity = {
  id: ObjectId;
  name: string;
};

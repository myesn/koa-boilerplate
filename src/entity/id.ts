import { ObjectId } from "mongodb";

export type IdEntity = {
  id: ObjectId | string;
};

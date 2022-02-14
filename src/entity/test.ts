import { Document, ObjectId } from "mongodb";

export default interface TestEntity extends Document {
  id: ObjectId;
  name: string;
}

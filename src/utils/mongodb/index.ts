import { ObjectId } from "mongodb";
import { Buffer } from "buffer";
import { ObjectIdLike } from "bson";

function objectId(
  id: string | number | ObjectId | ObjectIdLike | Buffer | Uint8Array
): ObjectId {
  return new ObjectId(id);
}

function isValidObjectId(
  id: string | number | ObjectId | ObjectIdLike | Buffer | Uint8Array
) {
  return ObjectId.isValid(id);
}

export { Aggregation } from "./aggregation";
export { querySelector } from "./querySelector";
export default { objectId, isValidObjectId };

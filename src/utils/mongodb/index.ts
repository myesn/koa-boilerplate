import { ObjectId } from "mongodb";
import { Buffer } from "buffer";
import { ObjectIdLike } from "bson";

function objectId(
  id: string | number | ObjectId | ObjectIdLike | Buffer | Uint8Array
): ObjectId {
  return new ObjectId(id);
}

export { Aggregation } from "./aggregation";
export default { objectId };

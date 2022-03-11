import { ObjectId } from "mongodb";
import { Buffer } from "buffer";
import { ObjectIdLike } from "bson";
import { Aggregation } from "./aggregation";

function objectId(
  id: string | number | ObjectId | ObjectIdLike | Buffer | Uint8Array
): ObjectId {
  return new ObjectId(id);
}

export default { objectId, Aggregation };

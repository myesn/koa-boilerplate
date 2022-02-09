import { ObjectSchema } from "joi";

function check(schema: ObjectSchema, data: any) {
  if (!schema) {
    return null;
  }

  const { error } = schema.validate(data);
  if (error) {
    throw Error(error.message);
  }
}

export default { check };

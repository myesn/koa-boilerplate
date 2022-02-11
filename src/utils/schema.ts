import { ObjectSchema } from "joi";

function check(data: any, schema?: ObjectSchema) {
  if (!schema) {
    return null;
  }

  const { error } = schema.validate(data);
  if (error) {
    throw Error(error.message);
  }
}

export default { check };

import Joi from "joi";

export default {
  find: Joi.object({
    id: Joi.string().required(),
  }),
  create: Joi.object({
    name: Joi.string().required(),
  }),
  update: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
  }),
  delete: Joi.object({
    id: Joi.string().required(),
  }),
};

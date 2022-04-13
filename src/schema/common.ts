import Joi from "joi";

export const paging = {
  skip: Joi.number().integer().min(0).required(),
  limit: Joi.number().integer().positive().required(),
  keyword: Joi.allow(null, "", Joi.string(), Joi.number()),
};

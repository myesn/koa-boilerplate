import Joi from "joi";

export const skip = Joi.number().integer().min(0).required();
export const limit = Joi.number().integer().positive().required();
export const keyword = Joi.allow(null, "", Joi.string(), Joi.number());

export const paging = {
  skip,
  limit,
  keyword,
};

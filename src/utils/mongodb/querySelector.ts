/**
 * Query and Projection Operators
 * https://www.mongodb.com/docs/manual/reference/operator/query/
 */

/** 比较运算符 https://www.mongodb.com/docs/manual/reference/operator/query/#comparison */
const comparison = {
  /** == */
  eq(value: string) {
    return { $eq: value };
  },
  /** != */
  ne(value: string) {
    return { $ne: value };
  },
  /** > */
  gt(value: string) {
    return { $gt: value };
  },
  /** >= */
  gte(value: string) {
    return { $gte: value };
  },
  /** < */
  lt(value: string) {
    return { $lt: value };
  },
  /** <= */
  lte(value: string) {
    return { $lte: value };
  },
  /** in */
  in(array: string[]) {
    return { $in: array };
  },
  /** not in */
  nin(array: string[]) {
    return { $nin: array };
  },
};

export const querySelector = {
  comparison,
};

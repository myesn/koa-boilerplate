/**
 * Query and Projection Operators
 * https://www.mongodb.com/docs/manual/reference/operator/query/
 */

/** 比较运算符 https://www.mongodb.com/docs/manual/reference/operator/query/#comparison */
const comparison = {
  /** == */
  eq(value: any) {
    return { $eq: value };
  },
  /** != */
  ne(value: any) {
    return { $ne: value };
  },
  /** > */
  gt(value: any) {
    return { $gt: value };
  },
  /** >= */
  gte(value: any) {
    return { $gte: value };
  },
  /** < */
  lt(value: any) {
    return { $lt: value };
  },
  /** <= */
  lte(value: any) {
    return { $lte: value };
  },
  /** in */
  in(array: any[]) {
    return { $in: array };
  },
  /** not in */
  nin(array: any[]) {
    return { $nin: array };
  },
};

export const querySelector = {
  comparison,
};

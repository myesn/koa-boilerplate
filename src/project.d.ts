// import { Document } from "bson";
// import {
//   Filter,
//   FindOptions,
//   ObjectId,
//   OptionalUnlessRequiredId,
//   UpdateFilter,
// } from "mongodb";
//
// declare interface Service {
//   list(filter: Filter<Document>, options?: FindOptions): Promise<Document[]>;
//
//   findById(id: string | ObjectId): Promise<Document | null>;
//
//   create(body: OptionalUnlessRequiredId<Document>): Promise<void>;
//
//   updateById(
//     id: string | ObjectId,
//     update: UpdateFilter<Document> | Partial<Document>
//   ): Promise<void>;
//
//   deleteById(id: string | ObjectId): Promise<void>;
// }
//
// declare interface Controller {}

import Koa from "koa";
import { ObjectSchema } from "joi";
import { Document } from "bson";

declare type DefaultSchema = {
  find?: ObjectSchema;
  create?: ObjectSchema;
  update?: ObjectSchema;
  delete?: ObjectSchema;
  [key: string]: any;
};

declare type PagingParam = {
  skip: number;
  limit: number;
  keyword?: string;
};

declare type PagingResult<TEntity> = {
  total: number;
  items: TEntity[];
};
declare type MongoDBAggregationExpression = Document | string | number | null;

declare type MongoDBAggregationLookupStage = {
  /** 指定要执行联接的同一数据库中的集合 */
  from: string;
  /** 指定变量，引用 local collection 中的字段  */
  let?: Document;
  /** 在 from collection 上执行的管道 */
  pipeline?: Document[];
  /** 当前集合中的字段名称 */
  localField?: string;
  /** from 集合中的字段名称 */
  foreignField?: string;
  /** 输出的数组字段名称 */
  as: string;
};

declare type MongoDBAggregationGroupStage = {
  /** 必需的。如果将 _id 值指定为 null 或任何其他常量值，则 $group 阶段将计算所有输入文档的累计值 */
  _id: string;
  [key: string]: any;
};

declare type MongoDBAggregationMapOperator = {
  /** 解析为数组的表达式 */
  input: string;
  /** 可选的。表示输入数组中每个单独元素的变量的名称。如果没有指定名称，变量名默认为 this */
  as?: string;
  /** 应用于输入数组的每个元素的表达式。该表达式使用 as 中指定的变量名称单独引用每个元素 */
  in: Document;
};

declare type MongoDBAggregationReduceOperator = {
  /** 可以是解析为数组的任何有效表达式 */
  input: string;
  /** 在in之前设置的初始累积值应用于输入数组的第一个元素 */
  initialValue: string;
  /** $reduce以从左到右的顺序应用于输入数组中的每个元素的有效表达式 */
  in: Document;
};

declare type MongoDBAggregationFilterOperator = {
  /** 解析为数组的表达式 */
  input: string;
  /** 可选的。表示输入数组中每个单独元素的变量的名称。如果没有指定名称，变量名默认为 this。 */
  as?: string;
  /** 解析为布尔值的表达式，该值用于确定一个元素是否应包含在输出数组中。表达式使用 as 中指定的变量名分别引用输入数组中的每个元素。 */
  cond: Document;
};

declare type MongoDBAggregationSwitchOperator = {
  branches: {
    case: MongoDBAggregationExpression;
    then: MongoDBAggregationExpression;
  }[];
  default?: MongoDBAggregationExpression;
};

declare type MongoDBAggregationDateToStringOperator = {
  /** 要转换为字符串的日期，必须是解析为 Date、Timestamp 或 ObjectID 的有效表达式。 */
  date: MongoDBAggregationExpression;
  /**
   * 可选的。日期格式规范。 默认："%Y-%m-%dT%H:%M:%S.%LZ",（在本项目中默认为 %Y-%m-%d %H:%M:%S）
   *
   * 年：%Y
   * 月：%m
   * 日：%d
   * 时：%H
   * 分：%M
   * 秒：%S
   * 参考：https://docs.mongodb.com/manual/reference/operator/aggregation/dateToString/#std-label-format-specifiers
   */
  format?: string;
  /**
   * 可选的。运算结果所在的时区。默认为 UTC（在本项目中默认为 Asia/Shanghai）
   * 参考：https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
   */
  timezone?: MongoDBAggregationExpression;
  /**
   * 可选的. 如果日期为空或缺失，则返回的值。
   * 如果 date 的值为 null 或没有这个字段，则默认返回 null
   */
  onNull?: MongoDBAggregationExpression;
};

declare type MongoDBAggregationDateDiffOperator = {
  /** 时间段的开始。 startDate 可以是解析为日期、时间戳或 ObjectID 的任何表达式。 */
  startDate: MongoDBAggregationExpression;
  /** 时间段的结束。 endDate 可以是解析为日期、时间戳或 ObjectID 的任何表达式 */
  endDate: MongoDBAggregationExpression;
  /** startDate 和 endDate 之间的时间测量单位。它是一个解析为字符串的表达式 */
  unit:
      | "year"
      | "quarter"
      | "week"
      | "month"
      | "day"
      | "hour"
      | "minute"
      | "second"
      | "millisecond";
  /** 时区，默认为 "Asia/Shanghai" */
  timezone?: string;
};

declare interface KoaCustomAppStateUser {
  id: string;
}

// https://stackoverflow.com/questions/43160598/adding-properties-to-koa2s-context-in-typescript
declare interface KoaCustomAppState {
  user: KoaCustomAppStateUser;
}

declare interface KoaCustomAppContext extends Koa.ExtendableContext {
  state: KoaCustomAppState;
}

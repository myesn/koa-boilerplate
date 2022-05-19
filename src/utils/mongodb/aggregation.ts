import { Collection, Document } from "mongodb";
import {
  MongoDBAggregationExpression,
  MongoDBAggregationGroupStage,
  MongoDBAggregationLookupStage,
  MongoDBAggregationMapOperator,
  MongoDBAggregationReduceOperator,
  MongoDBAggregationFilterOperator,
  MongoDBAggregationSwitchOperator,
  MongoDBAggregationDateToStringOperator,
  MongoDBAggregationDateDiffOperator,
} from "../../project";

export class Aggregation {
  constructor(protected pipeline: Document[] = []) {}

  static datePattern = {
    /** %Y年%m月%d日 */
    ChineseDate: "%Y年%m月%d日",
  };

  static operator = {
    map(doc: MongoDBAggregationMapOperator) {
      return { $map: doc };
    },
    or(expressions: MongoDBAggregationExpression[]) {
      return { $or: expressions };
    },
    first(expression: MongoDBAggregationExpression) {
      return { $first: expression };
    },
    concat(expressions: MongoDBAggregationExpression[]) {
      return { $concat: expressions };
    },
    cond(expressions: MongoDBAggregationExpression[]) {
      return { $cond: expressions };
    },
    eq(expressions: MongoDBAggregationExpression[]) {
      return { $eq: expressions };
    },
    ne(expressions: MongoDBAggregationExpression[]) {
      return { $ne: expressions };
    },
    reduce(doc: MongoDBAggregationReduceOperator) {
      return { $reduce: doc };
    },
    count() {
      return { $count: {} };
    },
    filter(doc: MongoDBAggregationFilterOperator) {
      return { $filter: doc };
    },
    size(expression: MongoDBAggregationExpression) {
      return { $size: expression };
    },
    switch(doc: MongoDBAggregationSwitchOperator) {
      return { $switch: doc };
    },
    dateToString(doc: MongoDBAggregationDateToStringOperator) {
      doc.format ??= "%Y-%m-%d %H:%M:%S";
      doc.timezone ??= "Asia/Shanghai";

      return { $dateToString: doc };
    },
    dateDiff(doc: MongoDBAggregationDateDiffOperator) {
      doc.timezone ??= "Asia/Shanghai";

      return {
        $dateDiff: doc,
      };
    },
    toString(expression: MongoDBAggregationExpression) {
      return { $toString: expression };
    },
    min(expression: MongoDBAggregationExpression) {
      return { $min: expression };
    },
    max(expression: MongoDBAggregationExpression) {
      return { $max: expression };
    },
    avg(expression: MongoDBAggregationExpression) {
      return { $avg: expression };
    },
    floor(expression: MongoDBAggregationExpression) {
      return { $floor: expression };
    },
    sum() {
      return { $sum: 1 };
    },
  };

  match(query: Document) {
    return this.pushStageToPipeline({ $match: query });
  }

  lookup(join: MongoDBAggregationLookupStage) {
    return this.pushStageToPipeline({ $lookup: join });
  }

  project(doc: Document) {
    return this.pushStageToPipeline({ $project: doc });
  }

  replaceRoot(replacementDocument: string | Document) {
    return this.pushStageToPipeline({
      $replaceRoot: { newRoot: replacementDocument },
    });
  }

  set(doc: Document) {
    return this.pushStageToPipeline({ $set: doc });
  }

  unset(fieldOrFields: string | string[]) {
    return this.pushStageToPipeline({ $unset: fieldOrFields });
  }

  group(doc: MongoDBAggregationGroupStage) {
    return this.pushStageToPipeline({ $group: doc });
  }

  skip(count: number) {
    if (count < 0) {
      throw new Error("skip 不能小于 0");
    }

    return this.pushStageToPipeline({ $skip: count });
  }

  limit(count: number) {
    if (count < 1) {
      throw new Error("limit 必须是一个正整数");
    }

    return this.pushStageToPipeline({ $limit: count });
  }

  /** asc:1；desc：-1 */
  sort(doc: { [key: string]: 1 | -1 }) {
    return this.pushStageToPipeline({ $sort: doc });
  }

  count(outputFieldName: string) {
    if (!outputFieldName) {
      throw new Error("count 的字段名不能为空");
    }

    if (outputFieldName[0] === "$") {
      throw new Error("count 的字段名不能以 $ 开头");
    }

    if (outputFieldName.includes(".")) {
      throw new Error("count 的字段名不能包含 . 字符");
    }

    return this.pushStageToPipeline({ $count: outputFieldName });
  }

  pushStageToPipeline(stage: Document) {
    if (!this.pipeline) {
      throw new Error("pipeline 不能为 null");
    }

    this.pipeline.push(stage);

    return this;
  }

  /** pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度 */
  pop() {
    if (this.pipeline && this.pipeline.length) {
      return this.pipeline.pop();
    }

    return undefined;
  }

  build() {
    return this.pipeline;
  }

  /** 自定义分页 stage，包含 $skip 和 $limit */
  page(skip: number, limit: number) {
    return this.skip(skip).limit(limit);
  }

  /** 直接获取文档数量 */
  async getCount(collection: Collection): Promise<number> {
    const countOutputField = "count";

    this.count(countOutputField);

    const countObj = await collection.aggregate(this.build()).next();

    // remove count stage
    this.pop();

    if (!countObj) {
      return 0;
    }

    return countObj[countOutputField] as number;
  }
}

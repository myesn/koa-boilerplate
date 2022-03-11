import { Collection, Document } from "mongodb";
import {
  MongoDBAggregationLookupStage,
  MongoDBAggregationMapOperator,
} from "../../project";

export class Aggregation {
  constructor(protected pipeline: Document[] = []) {}

  static operator = {
    map(doc: MongoDBAggregationMapOperator) {
      return { $map: doc };
    },
    or(expressions: Document[]) {
      return { $or: expressions };
    },
    first(expression: string) {
      return { $first: expression };
    },
  };

  match(query: Document) {
    return this.pushStageToPipeline({ $match: query });
  }

  lookup(join: MongoDBAggregationLookupStage) {
    return this.pushStageToPipeline({ $lookup: join });
  }

  set(doc: Document) {
    return this.pushStageToPipeline({ $set: doc });
  }

  unset(fieldOrFields: string | string[]) {
    return this.pushStageToPipeline({ $unset: fieldOrFields });
  }

  skip(count: number) {
    if (count < 0) {
      throw new Error("skip 必须是一个正整数");
    }

    return this.pushStageToPipeline({ $skip: count });
  }

  limit(count: number) {
    if (count < 0) {
      throw new Error("limit 必须是一个正整数");
    }

    return this.pushStageToPipeline({ $limit: count });
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
    if (!countObj) {
      return 0;
    }

    // remove count stage
    this.pop();

    return countObj[countOutputField] as number;
  }
}

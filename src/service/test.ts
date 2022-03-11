import CommonService from "./common";
import { TestEntity } from "../entity";
import { collectionName } from "../constant";

export default class TestService extends CommonService<TestEntity> {
  constructor() {
    super(collectionName.test);
  }
}

import CommonService from "./common";
import { TestEntity } from "../entity";

export default class TestService extends CommonService<TestEntity> {
  constructor() {
    super("tests");
  }
}

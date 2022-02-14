import CommonController from "./common";
import { TestService } from "../service";
import { TestSchema } from "../schema";

export default class TestController extends CommonController {
  constructor() {
    super(new TestService(), TestSchema);
  }
}

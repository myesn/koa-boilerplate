import { IdEntity } from "./id";
import { CreateTimeEntity, UpdateTimeEntity } from "./time";

export type TestEntity = IdEntity &
  CreateTimeEntity &
  UpdateTimeEntity & {
    name: string;
  };

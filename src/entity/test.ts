import { IdEntity, CreateTimeEntity, UpdateTimeEntity } from "./index";

export type TestEntity = IdEntity &
  CreateTimeEntity &
  UpdateTimeEntity & {
    name: string;
  };

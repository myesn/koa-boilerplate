import { ObjectId } from "mongodb";

export type IdEntity = {
    id: ObjectId;
    [key: string]: any;
};

export type CreateTimeEntity = {
    createTime: Date;
};

export type UpdateTimeEntity = {
    updateTime: Date;
};

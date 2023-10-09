import { StatusType } from "./constants";

export interface Base {
    uuid: string;
    status: StatusType;
    created_at: Date;
    updated_at: Date;
}
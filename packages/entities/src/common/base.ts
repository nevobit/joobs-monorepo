import { StatusType } from "./constants";

export interface Base {
    id: string;
    status: StatusType;
    created_at: Date;
    updated_at: Date;
}
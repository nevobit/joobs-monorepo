import { StatusType } from "./constants";

export interface Params {
    status?: StatusType;
    page?: number;
    limit?: number;
    search?: string;
}
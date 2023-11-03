import { Base } from "../../../common";

export interface Participant extends Base {
    userId: string;
    projectId: string;
}
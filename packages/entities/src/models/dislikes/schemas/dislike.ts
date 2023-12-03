import { Base } from "../../../common";

export interface Dislike extends Base {
    user: string;
    title: string;
    description: string;
}


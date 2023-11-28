import { Base } from "../../../common";

export interface Comment extends Base {
    user: string;
    title: string;
    description: string;
    images: string[];
    isPoll?: boolean;
    link: string;
}


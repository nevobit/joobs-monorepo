import { Base } from "../../../common";

export interface Message extends Base {
    user: string;
    text: string;
    description: string;
    images: string[];
    isPoll?: boolean;
    link: string;
}


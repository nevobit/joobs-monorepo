import { Base } from "../../../common";

export interface Like extends Base {
    user: string;
    title: string;
    description: string;
    images: string[];
    isPoll?: boolean;
    link: string;
}


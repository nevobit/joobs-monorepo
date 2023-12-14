import { Base } from "../../../common";

interface Poll {
    text: string;
    votes: number;
    users: string[]
}
export interface Discussion extends Base {
    user: string;
    title: string;
    description: string;
    images: string[];
    isPoll?: boolean;
    poll: Poll[];
    link: string;
}


import { Base } from "../../../common";

interface Poll {
    id: string;
    text: string; 
    votes: number;
}
export interface Discussion extends Base {
    user: string;
    title: string;
    description: string;
    images: string[];
    isPoll?: boolean;
    poll: Poll[];
    voters: string[];
    link: string;
}


import { Base } from "../../../common";

interface Location {
    lat: number;
    long: number;
    city: string;
    country: string;
}

interface Interest {
    type:string;
    learning: boolean;
    earning: boolean;
    networking: boolean;
    not: boolean;
}

interface SkillCategory {
    skill: string[]
}

interface SocialLinks {
    instagram: string;
    twitter: string;
    linkedin: string;
    facebook: string;
}

export interface User extends Base {
    email: string;
    name: string;
    phone: string;
    photo: string;
    location: Location;
    interest: Interest;
    method: string;
    company_name: string;
    headline: string;
    username: string;
    about: string;
    born_date: string;
    gender: string;
    graduation_date: string;
    school: string;
    proof_of_work: string;
    description: string;
    isIndividual: boolean;
    title: string;
    skills: string[];
    social_links:SocialLinks;
    isBlocked: boolean;
    isSuspended: boolean;
    block_reason: string;
    suspended_reason: string;
    notifications: boolean;
    last_login: string;
    skill_categories: SkillCategory[]; 
}


import { Base } from "../../../common";

export enum Type {
    WorkHome = "WorkHome",
    InOffice = "InOffice",
    Hibryd = "Hibryd",
}

export interface Coords {
    lat: number;
    long: number;
    city: string;
    country: string;
}

export interface Location {
    type: Type;
    coords: Coords;
}

export interface Remuneration {
    value: number;
    frecuency: string;
}
export interface Work extends Base {
    title: string;
    skills: string[];
    role: string;
    user: string;
    location: Location;
    description: string;
    remuneration: Remuneration;
}
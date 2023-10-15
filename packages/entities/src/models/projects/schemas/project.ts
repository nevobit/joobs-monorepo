import { Base } from "../../../common";

export enum Club {
    programming = "programming",
    design = "design",
    business = "business",
}

export enum Difficulty {
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard",
}

export enum Phase{
    Phase1 = "Phase1",
    Phase2 = "Phase2",
    Phase3 = "Phase3"
}

export enum Status{
    pending = "pending",
    inProgress = "inProgress",
    completed = "completed"
}

export interface Task {
    title: string;
    description: string;
    completed: boolean;
}

export interface Board{
    description: string;
    tasks: Task[];
    requirements: string[];
}

export interface Panel{
    duration: number;
    resources: string[];
    inCharge: string;
}

export interface Steps{
    panel: Panel;
    status: Status;
}

export interface Stages{
    phase: Phase;
    board: Board;
}

export interface Project extends Base {
    title: string;
    club: Club;
    description: string;
    skills: string[];
    stages: Stages[];
    steps: Steps[];
    difficulty: Difficulty;
    duration: number;
    reward: number;
}


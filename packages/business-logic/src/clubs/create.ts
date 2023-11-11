import { clientDb } from "@joobs/data-sources";
import { clubs } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";

export const createClub = async (data: InferInsertModel<typeof clubs>) => {
    const result = await clientDb().insert(clubs).values(data).returning();
    return result[0];
}


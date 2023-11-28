import { clientDb } from "@joobs/data-sources";
import { clubs } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const createClub = async (data: InferInsertModel<typeof clubs>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { clubs } })
  
    const result = await db.insert(clubs).values(data).returning();
    return result[0];
}


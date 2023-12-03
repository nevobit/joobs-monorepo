import { clientDb } from "@joobs/data-sources";
import { dislikes } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const createDislike = async (data: InferInsertModel<typeof dislikes>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { dislikes } })
  
    const result = await db.insert(dislikes).values(data).returning();
    return result[0];
}


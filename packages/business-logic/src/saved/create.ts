import { clientDb } from "@joobs/data-sources";
import { saved } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const createSaved = async (data: InferInsertModel<typeof saved>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { saved } })
  
    const result = await db.insert(saved).values(data).returning();
    return result[0];
}


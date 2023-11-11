import { clientDb } from "@joobs/data-sources";
import { works } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const createWork = async (data: InferInsertModel<typeof works>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { works } })
  
    const result = await db.insert(works).values(data).returning();
    return result[0];
}


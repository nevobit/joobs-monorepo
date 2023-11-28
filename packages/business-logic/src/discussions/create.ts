import { clientDb } from "@joobs/data-sources";
import { discussions } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const createDiscussion = async (data: InferInsertModel<typeof discussions>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { discussions } })
  
    const result = await db.insert(discussions).values(data).returning();
    return result[0];
}


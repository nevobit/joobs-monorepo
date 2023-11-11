import { clientDb } from "@joobs/data-sources";
import { likes } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const createLike = async (data: InferInsertModel<typeof likes>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { likes } })
  
    const result = await db.insert(likes).values(data).returning();
    return result[0];
}


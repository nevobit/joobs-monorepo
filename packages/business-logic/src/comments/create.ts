import { clientDb } from "@joobs/data-sources";
import { comments } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const createComment = async (data: InferInsertModel<typeof comments>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { comments } })
  
    const result = await db.insert(comments).values(data).returning();
    return result[0];
}


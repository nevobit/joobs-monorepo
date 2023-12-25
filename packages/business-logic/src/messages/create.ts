import { clientDb } from "@joobs/data-sources";
import { messages } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const createMessage = async (data: InferInsertModel<typeof messages>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { messages } })
  
    const result = await db.insert(messages).values(data).returning();
    return result[0];
}


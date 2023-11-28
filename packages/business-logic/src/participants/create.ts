import { clientDb } from "@joobs/data-sources";
import { participants } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const createParticipant = async (data: InferInsertModel<typeof participants>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { participants } })
  
    const result = await db.insert(participants).values(data).returning();
    return result[0];
}


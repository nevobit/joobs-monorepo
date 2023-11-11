import { clientDb } from "@joobs/data-sources";
import { participants } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";

export const createParticipant = async (data: InferInsertModel<typeof participants>) => {
    const result = await clientDb().insert(participants).values(data).returning();
    return result[0];
}


import { clientDb } from "@joobs/data-sources";
import { likes } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";

export const createLike = async (data: InferInsertModel<typeof likes>) => {
    const result = await clientDb().insert(likes).values(data).returning();
    return result[0];
}


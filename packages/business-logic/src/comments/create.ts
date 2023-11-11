import { clientDb } from "@joobs/data-sources";
import { comments } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";

export const createComment = async (data: InferInsertModel<typeof comments>) => {
    const result = await clientDb().insert(comments).values(data).returning();
    return result[0];
}


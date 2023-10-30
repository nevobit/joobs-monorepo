import { getDbInstance } from "@joobs/data-sources";
import { discussions } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";

export const createDiscussion = async (data: InferInsertModel<typeof discussions>) => {
    const result = await getDbInstance().insert(discussions).values(data).returning();
    return result[0];
}


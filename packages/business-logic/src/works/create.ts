import { clientDb } from "@joobs/data-sources";
import { works } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";

export const createWork = async (data: InferInsertModel<typeof works>) => {
    const result = await clientDb().insert(works).values(data).returning();
    return result[0];
}


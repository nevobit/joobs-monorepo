import { getDbInstance } from "@joobs/data-sources";
import { works } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";

export const createWork = async (data: InferInsertModel<typeof works>) => {
    console.log(data);
    const result = await getDbInstance().insert(works).values(data).returning();
    return result[0];
}


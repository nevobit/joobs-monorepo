import { getDbInstance } from "@joobs/data-sources";
import { applications } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";

export const createApplication = async (data: InferInsertModel<typeof applications>) => {
    const result = await getDbInstance().insert(applications).values(data).returning();
    return result[0];
}


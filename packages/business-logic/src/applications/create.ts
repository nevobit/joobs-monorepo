import { clientDb } from "@joobs/data-sources";
import { applications } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";

export const createApplication = async (data: InferInsertModel<typeof applications>) => {
    const infoInstance = await clientDb();
    const result = await infoInstance.insert(applications).values(data).returning();
    return result[0];
}


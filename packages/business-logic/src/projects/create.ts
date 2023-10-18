import { getDbInstance } from "@joobs/data-sources";
import { projects } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";

export const createProject = async (data: InferInsertModel<typeof projects>) => {
    console.log(data);
    const result = await getDbInstance().insert(projects).values(data).returning();
    return result[0];
}
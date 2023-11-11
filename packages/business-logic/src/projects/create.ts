import { clientDb } from "@joobs/data-sources";
import { projects } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const createProject = async (data: InferInsertModel<typeof projects>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { projects } })
  
    const result = await db.insert(projects).values(data).returning();
    return result[0];
}
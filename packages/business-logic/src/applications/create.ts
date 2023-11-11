import { clientDb } from "@joobs/data-sources";
import { applications } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const createApplication = async (data: InferInsertModel<typeof applications>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { applications }})

    const result = await db.insert(applications).values(data).returning();
    return result[0];
}


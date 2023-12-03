import { clientDb } from "@joobs/data-sources";
import {  projects } from "@joobs/entities";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const updateProject = async (data: any): Promise<any | Error> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { projects } })
  
    const result = await db.update(projects)
        .set(data)
        .where(eq(projects.id, data.id))
        .returning();
        
    return result[0];
}
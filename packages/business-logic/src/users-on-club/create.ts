import { clientDb } from "@joobs/data-sources";
import { usersOnClub } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const createUsersOnClub = async (data: InferInsertModel<typeof usersOnClub>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { usersOnClub } })
  
    const result = await db.insert(usersOnClub).values(data).returning();
    return result[0];
}


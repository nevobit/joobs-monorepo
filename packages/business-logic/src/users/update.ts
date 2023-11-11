import { clientDb } from "@joobs/data-sources";
import { User, users } from "@joobs/entities";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const updateUser = async (data: User): Promise<any | Error> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users } })
  
    const result = await db.update(users)
        .set(data)
        .where(eq(users.id, data.id))
        .returning();
        
    return result[0];
}
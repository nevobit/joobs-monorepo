import { getDbInstance } from "@joobs/data-sources";
import { User, users } from "@joobs/entities";
import { eq } from "drizzle-orm";

export const updateUser = async (data: User): Promise<any | Error> => {
    const result = await getDbInstance().update(users)
        .set(data)
        .where(eq(users.id, data.id))
        .returning();
        
    return result[0];
}
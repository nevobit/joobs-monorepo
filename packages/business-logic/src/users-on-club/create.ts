import { getDbInstance } from "@joobs/data-sources";
import { usersOnClub } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";

export const createUsersOnClub = async (data: InferInsertModel<typeof usersOnClub>) => {
    const result = await getDbInstance().insert(usersOnClub).values(data).returning();
    return result[0];
}


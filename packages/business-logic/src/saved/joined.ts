import { works, users, workRelations,  applicationsRelations, usersOnClub, usersOnClubRelations  } from "@joobs/entities";
import { clientDb } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
// 
export const getSaved = async (id: string): Promise<Boolean> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users, works, applicationsRelations, workRelations, usersOnClub, usersOnClubRelations } })

    const result = await db.query.usersOnClub.findMany({
        where: eq(usersOnClub.userId, id!),
    });

    const isJoined = result.length > 0;

    return isJoined
}
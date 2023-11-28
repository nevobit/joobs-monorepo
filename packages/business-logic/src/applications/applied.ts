import { works, users, workRelations,  applicationsRelations, applications, usersOnClub, usersOnClubRelations  } from "@joobs/entities";
import { clientDb } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
// 
export const getUserApplied = async (id: string): Promise<Boolean> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users, works, applicationsRelations, applications, workRelations, usersOnClub, usersOnClubRelations } })

    const result = await db.query.applications.findMany({
        where: eq(applications.userId, id!),
    });

    const isJoined = result.length > 0;

    return isJoined
}
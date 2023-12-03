import { works, users, workRelations, clubs, applicationsRelations, usersOnClub, usersOnClubRelations  } from "@joobs/entities";
import { clientDb } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
// 
export const getMyClubs = async (id: string): Promise<any> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users, works, applicationsRelations, workRelations, clubs, usersOnClub, usersOnClubRelations } })

    const result = await db.query.usersOnClub.findMany({
        where: eq(usersOnClub.userId, id!),
        with: {
            club: true
        }
    });

    const myClubs  = result.map((club) => {
        return club.club;
    })

    return myClubs;
}
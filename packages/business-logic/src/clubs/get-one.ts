import { users, clubs,  userRelations, workRelations,  applicationsRelations, usersOnClub, usersOnClubRelations  } from "@joobs/entities";
import { clientDb, /*getDbInstance */ } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

export const getClub = async ({ userId, clubId }: { userId: string, clubId: string }): Promise<any> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users, clubs, userRelations, workRelations,  applicationsRelations, usersOnClub, usersOnClubRelations } })

    // await result.where(eq(discussions.status, status));

    const result = await db.query.clubs.findMany({ where: eq(clubs.id, clubId!) })

    const userClubs = await db.query.usersOnClub.findMany({ where: eq(usersOnClub.userId, userId!) });

    const items = await Promise.all(
        result.map(async (club) => {
          const resultMembers = await db.query.usersOnClub.findMany({
            where: eq(usersOnClub.clubId, club.id!),
          });
          const updatedClub = { ...club, members: resultMembers.length, joined: userClubs.some((userClub) => userClub.clubId === club.id) };
          return updatedClub;
        })
      );
    return items[0]
}
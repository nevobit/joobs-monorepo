import { Result, Params, users, clubs,  userRelations, workRelations,  applicationsRelations, usersOnClub, usersOnClubRelations  } from "@joobs/entities";
import { clientDb, /*clientDb */ } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

export const getAllClubs = async ({ page= 1, limit=24, search }: Params): Promise<Result<any>> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users, clubs, userRelations, workRelations,  applicationsRelations, usersOnClub, usersOnClubRelations } })

    // await result.where(eq(discussions.status, status));

    const result = await db.query.clubs.findMany({})
    const pageSize = limit;
    // const skip = (page - 1) * pageSize;
    const count = (await result).length;
    const pages = Math.ceil(count / pageSize);


    // let items = await result.limit(pageSize);
    const hasPreviousPage = page > 1;
    const previousPage = hasPreviousPage ? page - 1 : page;

    const hasNextPage = page < pages;
    const nextPage = hasNextPage? page + 1 : page;

    const userClubs = await db.query.usersOnClub.findMany({ where: eq(usersOnClub.userId, search!) });

    const items = await Promise.all(
        result.map(async (club) => {
          const resultMembers = await db.query.usersOnClub.findMany({
            where: eq(usersOnClub.clubId, club.id!),
          });
          const updatedClub = { ...club, members: resultMembers.length, joined: userClubs.some((userClub) => userClub.clubId === club.id) };
          return updatedClub;
        })
      );
    return {
        count,
        items,
        pageInfo: {
            page,
            pages,
            hasPreviousPage,
            hasNextPage,
            nextPage,
            previousPage
        }, 
    }
}
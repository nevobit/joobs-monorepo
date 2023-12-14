import { users, clubs,  userRelations, workRelations, likes, likeRelations, applicationsRelations, usersOnClub, usersOnClubRelations  } from "@joobs/entities";
import { clientDb, /*clientDb */ } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

export const getLikes = async ({ id }: {id: string}): Promise<any> => {
    const infoInstance = await clientDb();
    const db = drizzle(infoInstance, { schema: { users, clubs, userRelations, workRelations, likes, likeRelations, applicationsRelations, usersOnClub, usersOnClubRelations } })

    const result = await db.query.likes.findMany({ where: eq(likes.discussionId, id!), with: {
        user: true
    }});

    return result
}
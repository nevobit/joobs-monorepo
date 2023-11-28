import { users, clubs,  userRelations, workRelations,  comments, commentRelations, applicationsRelations, usersOnClub, usersOnClubRelations  } from "@joobs/entities";
import { clientDb, /*clientDb */ } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

export const getComments = async ({ id }: {id: string}): Promise<any> => {
    const infoInstance = await clientDb();
    const db = drizzle(infoInstance, { schema: { users, clubs, userRelations, workRelations, comments, commentRelations, applicationsRelations, usersOnClub, usersOnClubRelations } })

    const result = await db.query.comments.findMany({ where: eq(comments.discussionId, id!), with: {
        user: true
    }});

    return result
}
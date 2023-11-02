import { users, clubs,  userRelations, workRelations,  discussions, discussionRelations, applicationsRelations, usersOnClub, usersOnClubRelations  } from "@joobs/entities";
import { clientDb, /*getDbInstance */ } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

export const getDiscussion = async ({ discussionId }: { discussionId: string }): Promise<any> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users, clubs, discussions, userRelations, workRelations,  applicationsRelations, usersOnClub, usersOnClubRelations, discussionRelations } })

    // await result.where(eq(discussions.status, status));

    const result = await db.query.discussions.findMany({ where: eq(discussions.id, discussionId!), with: {
        user: true
    } })

    return result[0]
}
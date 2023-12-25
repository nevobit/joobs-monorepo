import { users, clubs,  userRelations, workRelations,  discussions, likes, likeRelations, discussionRelations, applicationsRelations, usersOnClub, usersOnClubRelations  } from "@joobs/entities";
import { clientDb, /*clientDb */ } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

export const getDiscussion = async ({ discussionId, userId }: { discussionId: string, userId: string }): Promise<any> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users, clubs, discussions, likes, likeRelations, userRelations, workRelations,  applicationsRelations, usersOnClub, usersOnClubRelations, discussionRelations } })

    // await result.where(eq(discussions.status, status));

    const result = await db.query.discussions.findMany({ where: eq(discussions.id, discussionId!), with: {
        user: true
    } })


    const likesData = await db.query.likes.findMany({ where: eq(likes.userId, userId!) });

    const items = await Promise.all(
        result.map(async (club) => {
          const updatedClub = { ...club, liked: likesData.some((userClub) => userClub.discussionId === club.id) };
          return updatedClub;
        })
      );
    return items[0]
}
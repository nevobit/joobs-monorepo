import { Result, StatusType, Params, discussions, users, likes, likeRelations, comments, userRelations, discussionRelations, works } from "@joobs/entities";
import { clientDb, /*clientDb */ } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

export const getAllDiscussions = async ({ page= 1, limit=24, search, status= StatusType.ACTIVE }: Params): Promise<Result<any>> => {
    const infoInstance = await clientDb();

    console.log(status)
    const db = drizzle(infoInstance, { schema: { users, discussions, userRelations, comments, likes, likeRelations, discussionRelations, works } })

    // await result.where(eq(discussions.status, status));
  
    const result = await db.query.discussions.findMany({
        with: {
            user: true
        }
    })

    const pageSize = limit;
    const count = (await result).length;
    const pages = Math.ceil(count / pageSize);


    // let items = await result.limit(pageSize);
    // let items = result;
    const hasPreviousPage = page > 1;
    const previousPage = hasPreviousPage ? page - 1 : page;

    const hasNextPage = page < pages;
    const nextPage = hasNextPage? page + 1 : page;

    const userLike = await db.query.likes.findMany({ where: eq(likes.userId, search!) });


    const items = await Promise.all(
        result.map(async (discussion) => {
          const resultMembers = await db.query.comments.findMany({
            where: eq(comments.discussionId, discussion.id!),
          });

          const resultLikes = await db.query.likes.findMany({
            where: eq(likes.discussionId, discussion.id!),
          });

          const updatedClub = { ...discussion, comments: resultMembers.length, likes: resultLikes.length, liked: userLike.some((like) => like.discussionId === discussion.id)  };
          return updatedClub;
        })
      );

      const sortedDiscussions = items.sort((a, b) => {
        // Primero por likes (en orden descendente)
        const likesComparison = a.likes - b.likes;
        if (likesComparison !== 0) {
            return likesComparison;
        }
    
        // Luego por comentarios (en orden descendente)
        return a.comments - b.comments;
    });
    return {
        count,
        items: sortedDiscussions,
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
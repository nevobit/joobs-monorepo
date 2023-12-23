import { Result, clubs, Params, dislikes, dislikeRelations, discussions, users, likes, clubRelations, likeRelations, comments, userRelations, discussionRelations, works } from "@joobs/entities";
import { clientDb, /*clientDb */ } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

interface Props extends Params {
  userClubs: string[];
  option: string;
}

export const getAllDiscussions = async ({ page= 1, limit=24, search, userClubs, option }: Props): Promise<Result<any>> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users, clubs, dislikes, dislikeRelations, discussions, clubRelations, discussionRelations, userRelations, comments, likes, likeRelations, works } })

    // await result.where(eq(discussions.status, status));
  
    console.log({userClubs})
    const result = await db.query.discussions.findMany({
        with: {
            user: true,
            club: true
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
    const userDislike = await db.query.dislikes.findMany({ where: eq(dislikes.userId, search!) });


    const items = await Promise.all(
        result.map(async (discussion) => {
          const resultMembers = await db.query.comments.findMany({
            where: eq(comments.discussionId, discussion.id!),
          });

          const resultLikes = await db.query.likes.findMany({
            where: eq(likes.discussionId, discussion.id!),
          });

          const updatedClub = { ...discussion, comments: resultMembers.length, likes: resultLikes.length, liked: userLike.some((like) => like.discussionId === discussion.id), disliked: userDislike.some((like) => like.discussionId === discussion.id)  };
          return updatedClub;
        })
      );

      let sortedDiscussions = items;

      if(option == "forme" && userClubs){
        sortedDiscussions = items.sort((a, b) => {
          const isUserClubA = userClubs.includes(a.clubId!);
          const isUserClubB = userClubs.includes(b.clubId!);

          if (isUserClubA && !isUserClubB) {
              return 1; // Mover a 'a' hacia arriba
          } else if (!isUserClubA && isUserClubB) {
              return -1; // Mover a 'b' hacia arriba
          }

          return 0; // Mantener el orden original
      });
      }else if(option == "popular"){
      sortedDiscussions = items.sort((a, b) => {
          // Primero por likes (en orden descendente)
          const likesComparison = a.likes - b.likes;
          if (likesComparison !== 0) {
              return likesComparison;
          }
      
          // Luego por comentarios (en orden descendente)
          return a.comments - b.comments;
      });
      }else if(option == "latest"){
        sortedDiscussions = items.sort((a, b) => {
          const dateA = new Date(a.created_at!).getTime();
          const dateB = new Date(b.created_at!).getTime();
          return dateB + dateA;
      });
      }

   
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
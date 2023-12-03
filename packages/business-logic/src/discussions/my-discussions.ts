import { Result, clubs, Params, discussions, users, likes, clubRelations, likeRelations, comments, userRelations, discussionRelations, works } from "@joobs/entities";
import { clientDb, /*clientDb */ } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, or } from "drizzle-orm";

export const getMyDiscussions = async ({ page = 1, limit = 24, search }: Params): Promise<Result<any>> => {
  const infoInstance = await clientDb();
  const db = drizzle(infoInstance, { schema: { users, clubs, discussions, clubRelations, discussionRelations, userRelations, comments, likes, likeRelations, works } });

  const AllDiscussions =  await db.query.discussions.findMany({
    where: or(
        eq(discussions.userId, search!),
    ),
    with: {
        user: true,
        club: true,
    },
});
  const pageSize = limit;
  const count = AllDiscussions.length;
  const pages = Math.ceil(count / pageSize);

  const hasPreviousPage = page > 1;
  const previousPage = hasPreviousPage ? page - 1 : page;

  const hasNextPage = page < pages;
  const nextPage = hasNextPage ? page + 1 : page;

  const userLike = await db.query.likes.findMany({ where: eq(likes.userId, search!) });

  const items = AllDiscussions.map(async (discussion) => {
      const commentsList = await db.query.comments.findMany({
          where: eq(comments.discussionId, discussion.id!),
      });

      const resultLikes = await db.query.likes.findMany({
          where: eq(likes.discussionId, discussion.id!),
      });

      const updatedClub = { ...discussion, comments: commentsList.length, likes: resultLikes.length, liked: userLike.some((like) => like.discussionId === discussion.id) };
      return updatedClub;
  });

  return {
      count,
      items: await Promise.all(items),
      pageInfo: {
          page,
          pages,
          hasPreviousPage,
          hasNextPage,
          nextPage,
          previousPage,
      },
  };
};
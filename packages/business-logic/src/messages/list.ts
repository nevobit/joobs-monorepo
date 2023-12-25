import {
  Result,
  Params,
  dislikes,
  dislikeRelations,
  discussions,
  messages,
  users,
  likes,
  clubRelations,
  likeRelations,
  comments,
  userRelations,
  discussionRelations,
  works,
  messageRelations
} from "@joobs/entities";
import { clientDb /*clientDb */ } from "@joobs/data-sources";
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { and, eq, or } from "drizzle-orm";

interface Props extends Params {
  receiver: string;
  id: string;
}

export const getAllMessages = async ({
  page = 1,
  limit = 1000,
  id,
  receiver,
}: Props): Promise<Result<any>> => {
  const infoInstance = await clientDb();

  const db = drizzle(infoInstance, {
    schema: {
      users,
      messages,
      messageRelations,
      dislikes,
      dislikeRelations,
      discussions,
      clubRelations,
      discussionRelations,
      userRelations,
      comments,
      likes,
      likeRelations,
      works,
    },
  });

  const result = await db.query.messages.findMany({
    where: or(
      and(eq(messages.receiverId, receiver!), eq(messages.senderId, id!)),
      and(eq(messages.receiverId, id!), eq(messages.senderId, receiver!))
    )
  });

  const pageSize = limit;
  const count = (await result).length;
  const pages = Math.ceil(count / pageSize);

  // let items = await result.limit(pageSize);
  // let items = result;
  const hasPreviousPage = page > 1;
  const previousPage = hasPreviousPage ? page - 1 : page;

  const hasNextPage = page < pages;
  const nextPage = hasNextPage ? page + 1 : page;

  return {
    count,
    items: result,
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

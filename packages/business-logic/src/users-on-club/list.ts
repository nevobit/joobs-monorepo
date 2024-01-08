import {
  Result,
  works,
  Params,
  users,
  workRelations,
  applicationsRelations,
  usersOnClub,
  clubs,
  usersOnClubRelations,
} from "@joobs/entities";
import { clientDb } from "@joobs/data-sources";
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
//
export const getUsersOnClubsById = async ({
  page = 1,
  limit = 24,
  search,
}: Params): Promise<Result<any>> => {
  const infoInstance = await clientDb();

  const db = drizzle(infoInstance, {
    schema: {
      users,
      works,
      applicationsRelations,
      workRelations,
      usersOnClub,
      clubs,
      usersOnClubRelations,
    },
  });

  const result = await db.query.usersOnClub.findMany({
    where: eq(usersOnClub.clubId, search!),
    with: {
      club: true,
      user: true,
    },
  });

  const pageSize = limit;
  const skip = (page - 1) * pageSize;
  const count = (await result).length;
  const pages = Math.ceil(count / pageSize);

  // let items = await result.limit(pageSize);
  let items = result;

  const hasPreviousPage = page > 1;
  const previousPage = hasPreviousPage ? page - 1 : page;

  const hasNextPage = page < pages;
  const nextPage = hasNextPage ? page + 1 : page;

  console.log(skip, search);
  return {
    count,
    items,
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

import { Result, StatusType, Params, users, clubs,  userRelations } from "@joobs/entities";
import { clientDb, /*getDbInstance */ } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";

export const getAllClubs = async ({ page= 1, limit=24, search, status= StatusType.ACTIVE }: Params): Promise<Result<any>> => {
    const infoInstance = await clientDb();

    console.log(status)
    const db = drizzle(infoInstance, { schema: { users, clubs, userRelations } })

    // await result.where(eq(discussions.status, status));

    const result = await db.query.clubs.findMany({})

    const pageSize = limit;
    const skip = (page - 1) * pageSize;
    const count = (await result).length;
    const pages = Math.ceil(count / pageSize);


    // let items = await result.limit(pageSize);
    let items = result;
    const hasPreviousPage = page > 1;
    const previousPage = hasPreviousPage ? page - 1 : page;

    const hasNextPage = page < pages;
    const nextPage = hasNextPage? page + 1 : page;

    console.log(skip, search)
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
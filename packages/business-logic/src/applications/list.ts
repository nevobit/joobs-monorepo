import { Result, works, StatusType, Params, users, workRelations, applications, applicationsRelations  } from "@joobs/entities";
import { clientDb } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
// 
export const getApplicationsById = async ({ page= 1, limit=24, search, status=StatusType.ACTIVE }: Params): Promise<Result<any>> => {
    const infoInstance = await clientDb();
    const db = drizzle(infoInstance, { schema: { users, works, applications, applicationsRelations, workRelations } })

    console.log(status)
    const result = await db.query.applications.findMany({
        where: eq(applications.userId, search!),
        with: {
            work: {
                with: {
                    user: true
                }
            }
        }
    })

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
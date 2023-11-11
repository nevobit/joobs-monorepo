import { Result, projects, StatusType, Params } from "@joobs/entities";
import { clientDb } from '@joobs/data-sources'
import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";

export const getAllProjects = async ({ page= 1, limit=14, search, status= StatusType.ACTIVE }: Params): Promise<Result<any>> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { projects } })
  

    const result = db.select().from(projects);

    await result.where(eq(projects.status, status));

    const pageSize = limit;
    const skip = (page - 1) * pageSize;
    const count = (await result).length;
    const pages = Math.ceil(count / pageSize);

    let items = await result.limit(pageSize);

    const hasPreviousPage = page > 1;
    const previousPage = hasPreviousPage ? page - 1 : page;

    const hasNextPage = page < pages;
    const nextPage = hasNextPage? page + 1 : page;

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
            previousPage
        }, 
    }
}
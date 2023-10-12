import { Result, Work, works, StatusType, Params } from "@joobs/entities";
import { getDbInstance } from '@joobs/data-sources'
import { eq } from 'drizzle-orm'

export const getAllWorks = async ({ page= 1, limit=14, search, status= StatusType.ACTIVE }: Params): Promise<Result<any> | Error> => {
    const result = getDbInstance().select({
        uuid: works.uuid,
        title: works.title,
        status: works.status
    }).from(works);

    await result.where(eq(works.status, status));

    const pageSize = limit;
    const skip = (page - 1) * pageSize;
    const count = (await result).length;
    const pages = Math.ceil(count / pageSize);


    let items = await result.limit(pageSize);
    items = (await result).map((item) => ({
        uuid: item.uuid,
        title: item.uuid,
        status: item.uuid
    })) as Work[];
    
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
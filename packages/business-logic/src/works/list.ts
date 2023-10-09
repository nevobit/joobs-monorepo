import { Result, Work } from "../../../entities";

export const getAllWorks = async (): Promise<Result<Work> | Error> => {
    return {
        count: 0,
        items: [],
        pageInfo: {
            page: 1,
            pages: 10,
            hasPreviousPage: false,
            hasNextPage: true,
            nextPage:2,
            previousPage: 1
        }, 
    }
}
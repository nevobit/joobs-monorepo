import {  useQuery } from "@apollo/client";
import { IS_REQUEST } from "../../graphql/queries";

export const useIsRequest = (id: string) => {
    const { data, loading, refetch } = useQuery(IS_REQUEST, {
        variables: {
            data: {
                receiverId: id
            }
        }
    });

    return { isLoading: loading, isRequest: data?.isRequest, refetch }
}
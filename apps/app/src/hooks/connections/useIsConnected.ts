import {  useQuery } from "@apollo/client";
import { IS_CONNECTED } from "../../graphql/queries";

export const useIsConnected = (id: string) => {
    const { data, loading } = useQuery(IS_CONNECTED, {
        variables: {
            data: {
                receiverId: id
            }
        }
    });

    return { isLoading: loading, isConnected: data?.isConnected }
}
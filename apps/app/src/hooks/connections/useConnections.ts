import {  useQuery } from "@apollo/client";
import { CONNECTIONS } from "../../graphql/queries";

export const useConnections = (id?: string) => {
    const { data, loading } = useQuery(CONNECTIONS, {
        variables: {
            connectionsId: id
        }
    });

    return { isLoading: loading, connections: data?.connections }
}
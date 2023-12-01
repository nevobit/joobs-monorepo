import { useQuery } from "@apollo/client";
import { MYCLUBS } from "../../graphql/queries/clubs";

export const useMyClubs = () => {
    const {data, loading, error, refetch} = useQuery(MYCLUBS);

    return { clubs: data?.myClubs, isLoading: loading, error }
}
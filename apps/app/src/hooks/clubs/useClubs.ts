import { useQuery } from "@apollo/client";
import { CLUBS } from "../../graphql/queries/clubs";

export const useClubs = () => {
    const {data, loading, error} = useQuery(CLUBS);

    return { clubs: data?.clubs, isLoading: loading, error }
}
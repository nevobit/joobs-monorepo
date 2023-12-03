import { useQuery } from "@apollo/client";
import { MY_DISCUSSIONS } from "../../graphql/queries";

export const useMyDiscussions = () => {
    const { data, loading, error, refetch } = useQuery(MY_DISCUSSIONS);

    return {
        discussions: data?.myDiscussions,
        isLoading: loading,
        error: error,
        refetch
    }
}
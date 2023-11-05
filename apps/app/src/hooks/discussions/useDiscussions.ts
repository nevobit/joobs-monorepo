import { useQuery } from "@apollo/client";
import { DISCUSSIONS } from "../../graphql/queries";

export const useDiscussions = () => {
    const { data, loading, error, refetch } = useQuery(DISCUSSIONS);

    return {
        discussions: data?.discussions,
        isLoading: loading,
        error: Boolean(error),
        refetch
    }
}
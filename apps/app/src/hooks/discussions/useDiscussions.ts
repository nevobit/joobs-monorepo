import { useQuery } from "@apollo/client";
import { DISCUSSIONS } from "../../graphql/queries";
import { useMyClubs } from "../clubs";

export const useDiscussions = (option: string) => {
    const { clubs, isLoading: isLoadingClubs } = useMyClubs();

    const userClubIds = clubs?.map((club: any) => club.id);

    const { data, loading, error, refetch } = useQuery(DISCUSSIONS, {
        variables: {
            data: {
                option,
                userClubs: userClubIds
            }
        }
    });

    const isLoading = loading && isLoadingClubs

    return {
        discussions: data?.discussions,
        isLoading,
        error: error,
        refetch
    }
}
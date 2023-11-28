import { useQuery } from "@apollo/client";
import { IS_PARTICIPANT } from "../../graphql/queries/participants";

export const useIsParticipant = (id: string) => {
    const { data, loading, error, refetch } = useQuery(IS_PARTICIPANT, {
        variables: {
            projectId: id
        }
    });

    return {
        isParticipant: data?.isParticipant, loading,
        refetch
    }
}
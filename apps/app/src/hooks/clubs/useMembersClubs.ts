import { useQuery } from "@apollo/client";
import { MEMBERS } from "../../graphql/queries/members";

export const useMembersClubs = (id: string) => {
    const { data, loading, refetch: refetchMembers } = useQuery(MEMBERS, {
        variables: {
            membersId: id
        }
    });

    return { members: data?.members, isLoading: loading }

}
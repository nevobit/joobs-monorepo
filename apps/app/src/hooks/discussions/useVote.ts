import { useMutation } from "@apollo/client";
import { DISCUSSIONS } from "../../graphql/queries";
import { VOTE } from "../../graphql/mutations";

interface Props {
    discussionId?: string;
    optionId?: string;
}

export const useVote = ({discussionId, optionId} : Props) => {
    const [ vote, { loading } ] = useMutation(VOTE, {
        variables: {
            data: {
                discussionId,
                optionId
            }
        },
        refetchQueries: [
            { query: DISCUSSIONS }
        ]
    });

    return { vote, isVoting: loading }
}
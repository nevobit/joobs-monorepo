import { useMutation } from "@apollo/client";
import { CONNECT } from "../../graphql/mutations";
import { IS_REQUEST } from "../../graphql/queries";

export const useConnect = (id: string) => {
    const [ connect, { loading } ] = useMutation(CONNECT, {
        variables: {
            data: {
                receiverId: id
            }
        },
        refetchQueries: [
            { query: IS_REQUEST }
        ]
    });

    return { connect, isCreating: loading }
}
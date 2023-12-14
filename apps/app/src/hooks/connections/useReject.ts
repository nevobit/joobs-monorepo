import { useMutation } from "@apollo/client";
import {  REJECT } from "../../graphql/mutations";
import { IS_REQUEST } from "../../graphql/queries";

export const useReject = (id: string) => {
    const [ reject, { loading } ] = useMutation(REJECT, {
        variables: {
            data: {
                receiverId: id
            }
        },
        refetchQueries: [
            { query: IS_REQUEST }
        ]
    });

    return { reject, isRejected: loading }
}
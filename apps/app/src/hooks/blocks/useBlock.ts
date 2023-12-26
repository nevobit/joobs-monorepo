import { useMutation } from "@apollo/client";
import { BLOCK } from "../../graphql/mutations";
import { DISCUSSIONS } from "../../graphql/queries";
import { useEffect } from "react";
import RNRestart from "react-native-restart"
export const useBlock = (id: string) => {
    console.log({id})
    const [ block, { loading } ] = useMutation(BLOCK, {
        variables: {
            data: {
                receiverId: id
            }
        },
        refetchQueries: [
            { query: DISCUSSIONS }
        ]
    });

    return { block, isBlocking: loading }
}
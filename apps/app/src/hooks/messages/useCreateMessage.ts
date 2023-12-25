import { useMutation } from "@apollo/client";
import { MESSAGE } from "../../graphql/mutations";
import { MESSAGES } from "../../graphql/queries";

export const useCreateMessage = (setMessagesList: any) => {
    const [ message, { loading, error } ] = useMutation(MESSAGE, {
        refetchQueries: [
            { query: MESSAGES }
        ]
    });

    return { message, isCreating: loading, error }
}
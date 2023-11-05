import { useMutation } from "@apollo/client";
import { GET_USER_BY_ID } from "../../graphql/queries";
import { UPDATE_USER } from "../../graphql/mutations/users";

export const useUpdateUser = () => {
    const [ updateUser, { loading } ] = useMutation(UPDATE_USER, {
        refetchQueries: [
            { query: GET_USER_BY_ID }
        ]
    });

    return { updateUser, isUpdating: loading }
}
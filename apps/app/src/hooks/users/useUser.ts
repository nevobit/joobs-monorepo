import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { GET_USER_BY_ID } from "../../graphql/queries";

export const useUser = () => {
    const { user } = useSelector((state: any) => state.auth);
    console.log(user.token)
    const { data, loading, error, refetch } = useQuery(GET_USER_BY_ID, {
      context: {
        headers: {
          authorization: user.token ? `Bearer ${user.token}` : '',
        },
      },
    });

    return { isLoading: loading, error, user: data?.user,
      refetch
    }
  
}
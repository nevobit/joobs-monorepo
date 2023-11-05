import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { GET_USER_BY_ID } from "../../graphql/queries";

export const useUser = () => {
    const { data, loading, error, refetch } = useQuery(GET_USER_BY_ID);

    return { isLoading: loading, error, user: data?.user,
      refetch
    }
  
}
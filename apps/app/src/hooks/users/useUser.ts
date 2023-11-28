import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { GET_USER_BY_ID } from "../../graphql/queries";

export const useUser = (id?: string) => {
    const { data, loading, error, refetch } = useQuery(GET_USER_BY_ID, {
      variables: { uuid: id },
    });

    console.log("USER ERROR", error)
    return { isLoading: loading, error, user: data?.user,
      refetch
    }
  
}
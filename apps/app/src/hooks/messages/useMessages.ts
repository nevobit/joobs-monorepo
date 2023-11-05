import { useQuery } from "@apollo/client"
import { MESSAGES } from "../../graphql/queries/messages";

export const useMessages = () => {
    const { data } = useQuery(MESSAGES);
}
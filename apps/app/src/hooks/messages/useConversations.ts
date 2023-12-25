import { useQuery } from "@apollo/client"
import { CONVERSATIONS } from "../../graphql/queries/messages";

export const useConversations = () => {
    const { data, loading, error } = useQuery(CONVERSATIONS);
    return { conversations: data?.conversations, isLoading: loading, error }
}
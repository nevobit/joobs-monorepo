import { useQuery } from "@apollo/client"
import { MESSAGES } from "../../graphql/queries/messages";

export const useMessages = (receiverId: string, setMesssagesList: any) => {
    const { data, loading, error, refetch } = useQuery(MESSAGES, {
        variables: {
            receiverId
        },
        onCompleted(data) {
            setMesssagesList(data.messages)
        },
    });
    return { messages: data?.messages, isLoading: loading, error, refetch }
}
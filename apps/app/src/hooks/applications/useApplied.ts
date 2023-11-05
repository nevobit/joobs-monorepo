import { useQuery } from "@apollo/client"
import { APPLIED } from "../../graphql/queries/applications"

export const useApplied = () => {
    const { data, loading } = useQuery(APPLIED)
    return { isLoading: loading, isApplied: data.applied}
}
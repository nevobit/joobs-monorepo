import { gql } from "@apollo/client";

export const BLOCK = gql`
mutation Mutation($data: BlockInput) {
    block(data: $data)
}
`
import { gql } from "@apollo/client";

export const COMMENT = gql`
mutation Mutation($data: DataCreateComment) {
  comment(data: $data) {
    text
    id
  }
}
`
import { gql } from "@apollo/client";

export const LIKE = gql`
mutation Mutation($data: DataCreateLike) {
  like(data: $data) {
    created_at
  }
}
`

export const DELETELIKE = gql`
mutation Mutation($data: DataCreateLike) {
  likeDelete(data: $data)
}
`
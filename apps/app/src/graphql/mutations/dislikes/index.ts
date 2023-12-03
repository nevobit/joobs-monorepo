import { gql } from "@apollo/client";

export const DISLIKE = gql`
mutation Mutation($data: DataCreateLike) {
  dislike(data: $data) {
    created_at
  }
}
`

export const DELETEDISLIKE = gql`
mutation Mutation($data: DataCreateLike) {
  dislikeDelete(data: $data)
}
`
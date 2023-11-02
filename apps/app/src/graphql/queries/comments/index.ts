import { gql } from "@apollo/client";

export const COMMENTS = gql`
query Comments($commentsId: String) {
  comments(id: $commentsId) {
    id
    user {
      photo
      name
    }
    text
    created_at
  }
}
`
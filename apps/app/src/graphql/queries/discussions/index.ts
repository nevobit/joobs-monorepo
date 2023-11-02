import { gql } from "@apollo/client";

export const DISCUSSIONS = gql`
query Query {
  discussions {
    id
    title
    description
    images
    user {
      name
      photo
    }
    created_at
  }
}
`

export const DISCUSSION = gql`
query Query($discussionId: String) {
  discussion(id: $discussionId) {
    title
    description
    images
    user {
      name
      photo
    }
    created_at
  }
}
`
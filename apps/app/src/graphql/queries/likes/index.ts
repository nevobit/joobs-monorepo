import { gql } from "@apollo/client";

export const LIKES = gql`
query Likes($likesId: String) {
  likes(id: $likesId) {
    created_at
  }
}
`
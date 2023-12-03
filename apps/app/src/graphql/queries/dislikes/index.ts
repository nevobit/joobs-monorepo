import { gql } from "@apollo/client";

export const DISLIKES = gql`
query Dislikes($likesId: String) {
  dislikes(id: $likesId) {
    created_at
  }
}
`
import { gql } from "@apollo/client";

export const DISCUSSIONS = gql`
query Query {
  discussions {
    uuid
    title
    description
    images
    user {
      name
      email
    }
  }
}
`
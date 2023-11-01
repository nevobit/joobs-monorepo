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
      email
    }
  }
}
`
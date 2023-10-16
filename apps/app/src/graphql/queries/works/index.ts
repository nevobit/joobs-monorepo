import { gql } from "@apollo/client";

export const WORKS = gql`
query Query {
  works {
    description
    role
    title
    user
  }
}
`
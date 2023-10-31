import { gql } from "@apollo/client";

export const WORKS = gql`
query Query {
  works {
    uuid
    description
    role
    title
  }
}
`
import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query Query {
    user {
      uuid
      name
      email
      gender
      born_date
    }
  }
`
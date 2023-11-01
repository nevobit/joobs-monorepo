import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query Query {
    user {
      id
      name
      email
      gender
      photo
      phone
      born_date
    }
  }
`
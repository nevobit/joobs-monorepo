import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query Query {
    user {
      id
      name
      email
      gender
      skills
      photo
      phone
      location {
        latitude
        longitude
        address
      }
      about
      company_name
      college
      headline
      born_date
      icebreaker
      instagram
      facebook
      linkedin
      twitter
    }
  }
`

export const USERS = gql`
query Query {
  users {
    photo
    name
    id
    skills
  }
}
`
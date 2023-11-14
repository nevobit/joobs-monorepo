import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query Query($uuid: String) {
    user(uuid: $uuid) {
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
      company_website
      company_logo
      company_description
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
    headline
    company_name
    company_website
    company_logo
    company_description
  }
}
`
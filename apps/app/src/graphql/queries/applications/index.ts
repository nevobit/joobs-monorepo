import { gql } from "@apollo/client";

export const APPLICATIONS = gql`
query Query {
  applications {
    work {
      created_at
      description
      user {
        photo
        name
      }
      remuneration {
        frecuency
        value
      }
      role
      skills
      title
      id
    }
  }
}
`

export const APPLIED = gql`
query Query {
  applied
}
`
import { gql } from "@apollo/client";

export const WORKS = gql`
query Query {
  works {
    id
    role
    remuneration {
      value
      frecuency
    }
    title
    skills
    user {
      id
      photo
      name
      company_name
    }
    created_at
  }
}
`

export const WORK = gql`
query Query($workId: String) {
  work(id: $workId) {
    role
    title
    skills
    user {
      photo
      name
      company_name
    }
    id
    description
    created_at
    remuneration {
      frecuency
      value
    }
  }
}
`

export const LISTING = gql`
query WorkByUser {
  workByUser {
    id
    title
    role
    skills
  }
}
`
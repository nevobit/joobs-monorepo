import { gql } from "@apollo/client";

export const CREATE_WORK = gql`
mutation Mutation($data: DataCreateWork) {
  createWork(data: $data) {
    description
    remuneration {
      frecuency
      value
    }
    role
    title
    user
  }
}
`
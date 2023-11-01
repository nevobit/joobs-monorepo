import { gql } from "@apollo/client";

export const APPLY = gql`
mutation Mutation($data: DataCreateApplication) {
  createApplication(data: $data) {
    work {
      id
      description
    }
  }
}
`
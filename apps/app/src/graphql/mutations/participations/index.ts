import { gql } from "@apollo/client";

export const PARTICIPATE = gql`
mutation Mutation($data: DataCreateParticipant) {
  participate(data: $data) {
    project {
      id
    }
  }
}
`
import { gql } from "@apollo/client";

export const JOIN = gql`
mutation Mutation($data: DataCreateMember) {
    joinToClub(data: $data) {
      club {
        name
      }
      user {
        name
      }
    }
  }
`
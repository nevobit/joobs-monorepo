import { gql } from "@apollo/client";

export const MEMBERS = gql`
query Members($membersId: String) {
  members(id: $membersId) {
    user {
      name
      photo
      skills
    }
  }
}
`
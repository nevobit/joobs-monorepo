import { gql } from "@apollo/client";

export const CLUBS = gql`
query Clubs {
  clubs {
    description
    icon
    name
    members
    id
    joined
  }
}
`

export const CLUB = gql`
query Query($clubId: String) {
  club(id: $clubId) {
    description
    icon
    joined
    members
    name
  }
}
`
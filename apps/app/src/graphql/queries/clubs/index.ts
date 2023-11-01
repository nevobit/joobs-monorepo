import { gql } from "@apollo/client";

export const CLUBS = gql`
query Clubs {
  clubs {
    description
    icon
    name
    id
  }
}
`
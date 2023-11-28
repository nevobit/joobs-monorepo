import { gql } from "@apollo/client";

export const CREATE_DISCUSSION = gql`
mutation Mutation($data: DataCreateDiscussion) {
  createDiscussion(data: $data) {
    description
    images
    link
    title
  }
}
`
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

export const VOTE = gql`
mutation Mutation($data: VoteInput) {
  vote(data: $data)
}`
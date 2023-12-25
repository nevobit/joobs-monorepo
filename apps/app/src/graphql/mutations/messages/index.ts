import { gql } from "@apollo/client";

export const MESSAGE = gql`
mutation Mutation($data: MessageInput) {
  createMessage(data: $data) {
    id
    created_at
    receiverId
    senderId
    text
  }
}
`
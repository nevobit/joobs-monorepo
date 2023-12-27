import { gql } from "@apollo/client";

export const MESSAGES = gql`
query Query($receiverId: String) {
    messages(receiverId: $receiverId) {
      id
      text
      senderId
      created_at
    }
  }
`

export const CONVERSATIONS = gql`
query Conversations {
  conversations {
    lastMessage
    lastMessageTime
    participantId
    user {
      name
      photo
    }
  }
}
`
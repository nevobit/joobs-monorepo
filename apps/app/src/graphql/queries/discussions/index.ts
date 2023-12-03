import { gql } from "@apollo/client";

export const DISCUSSIONS = gql`
query Query {
  discussions {
    id
    title
    description
    comments
    images
    likes
    liked
    disliked
    club {
      id
      name
    }
    user {
      id
      name
      photo
    }
    created_at
  }
}
`

export const DISCUSSION = gql`
query Query($discussionId: String) {
  discussion(id: $discussionId) {
    title
    description
    images
    likes
    liked
    disliked
    user {
      name
      photo
    }
    created_at
  }
}
`

export const MY_DISCUSSIONS = gql`query MyDiscussions {
  myDiscussions {
    club {
      description
      icon
      id
      joined
      members
      name
    }
    comments
    created_at
    description
    id
    images
    liked
    likes
    disliked
    link
    title
    user {
      name
      photo
    }
  }
}
`
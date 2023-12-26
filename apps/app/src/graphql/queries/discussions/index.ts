import { gql } from "@apollo/client";

export const DISCUSSIONS = gql`
query Discussions($data: DiscussionInput) {
  discussions(data: $data) {
    id
    title
    description
    comments
    images
    likes
    liked
    link
    disliked
    voters
    isPoll
    poll {
      id
      text
      votes
    }
    club {
      id
      name
    }
    user {
      id
      name
      photo
      headline
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
    poll {
      id
      text
      votes
    }
    isPoll
    liked
    link
    disliked
    user {
      id
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
    link
    liked
    likes
    poll
    isPoll
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
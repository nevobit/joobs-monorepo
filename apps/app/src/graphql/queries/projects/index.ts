import { gql } from "@apollo/client";

export const PROJECTS = gql`
query Query {
  projects {
    id
    difficulty
    duration
    skills
    title
  }
}
`

export const PROJECT = gql`
query Query($projectId: String) {
  project(id: $projectId) {
    description
    difficulty
    duration
    prerequisites
    skills
    stages {
      steps {
        description
        title
      }
    }
    submission
    title
  }
}
`
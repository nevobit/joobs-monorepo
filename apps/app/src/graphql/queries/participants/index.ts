import { gql } from "@apollo/client";

export const IS_PARTICIPANT= gql`
query Query($projectId: String) {
  isParticipant(projectId: $projectId)
}
`
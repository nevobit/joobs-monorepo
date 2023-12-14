import { gql } from "@apollo/client";

export const IS_REQUEST = gql`
query Query($data: ConnectionInput) {
    isRequest(data: $data)
  }
`

export const IS_CONNECTED = gql`
query Query($data: ConnectionInput) {
    isConnected(data: $data)
  }
`

export const CONNECTIONS = gql`
query Query($connectionsId: String) {
    connections(id: $connectionsId)
  }
`


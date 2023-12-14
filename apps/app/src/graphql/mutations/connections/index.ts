import { gql } from "@apollo/client";

export const CONNECT = gql`
mutation Mutation($data: ConnectionInput) {
    connect(data: $data)
}
`

export const REJECT = gql`
mutation Mutation($data: ConnectionInput) {
    reject(data: $data)
}
`
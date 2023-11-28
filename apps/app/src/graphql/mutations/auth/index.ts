import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation Mutation($email: String!) {
    userLogin(email: $email) {
        token
        type
    }
}
`

export const LOGIN_GOOGLE = gql`
mutation Mutation($email: String!) {
    userLoginGoogle(email: $email) {
        token
        type
    }
}
`

export const VERIFY_CODE = gql`
mutation Mutation($email: String!, $code: String!) {
  verifyCode(email: $email, code: $code) {
    token
  }
}
`

export const REGISTER_USER = gql`
mutation UserRegister($data: UserInput) {
  userRegister(data: $data) {
    token
  }
}
`
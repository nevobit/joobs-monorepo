import auth from './auth'
import works from './works'
import users from './users'
import discussions from './discussions'

export default {
    Query: {
        ...works.Query,
        ...users.Query,
        ...discussions.Query
    },
    Mutation: {
        ...auth.Mutation,
        ...works.Mutation,
        ...discussions.Mutation
    }
}
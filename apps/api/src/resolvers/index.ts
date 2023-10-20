import auth from './auth'
import works from './works'

export default {
    Query: {
        ...works.Query,
    },
    Mutation: {
        ...auth.Mutation,
        ...works.Mutation,
    }
}
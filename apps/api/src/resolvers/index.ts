import auth from './auth'
import works from './works'
import users from './users'
import discussions from './discussions'
import clubs from './clubs'
import applications from './applications'
import members from './users-on-club'
import comments from './comments'
import likes from './likes'

export default {
    Query: {
        ...works.Query,
        ...users.Query,
        ...discussions.Query,
        ...clubs.Query,
        ...applications.Query,
        ...members.Query,
        ...comments.Query,
        ...likes.Query
    },
    Mutation: {
        ...auth.Mutation,
        ...works.Mutation,
        ...discussions.Mutation,
        ...clubs.Mutation,
        ...applications.Mutation,
        ...members.Mutation,
        ...comments.Mutation,
        ...likes.Mutation
    }
}
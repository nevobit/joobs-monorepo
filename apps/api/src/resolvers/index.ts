import auth from './auth'
import works from './works'
import users from './users'
import discussions from './discussions'
import clubs from './clubs'
import applications from './applications'
import members from './users-on-club'
import comments from './comments'
import likes from './likes'
import dislikes from './dislikes'
import projects from './projects'
import participants from './participants'
import messages from './messages'
import connections from './connections'

export default {
    Query: {
        ...works.Query,
        ...users.Query,
        ...discussions.Query,
        ...clubs.Query,
        ...applications.Query,
        ...members.Query,
        ...comments.Query,
        ...likes.Query,
        ...dislikes.Query,
        ...projects.Query,
        ...participants.Query,
        ...connections.Query
    },
    Mutation: {
        ...auth.Mutation,
        ...works.Mutation,
        ...discussions.Mutation,
        ...clubs.Mutation,
        ...applications.Mutation,
        ...members.Mutation,
        ...comments.Mutation,
        ...likes.Mutation,
        ...dislikes.Mutation,
        ...projects.Mutation,
        ...participants.Mutation,
        ...messages.Mutation,
        ...users.Mutation,
        ...connections.Mutation
    },
    Subscription: {
        ...messages.Subscription
    }
}
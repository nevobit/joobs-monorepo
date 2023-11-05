import { PubSub } from 'graphql-subscriptions'
const pubSub = new PubSub();

export default {
    Query: {
    },
    Mutation: {
        addMessage: async (_:any, { text }: { text: string }, _ctx:any ) => {
            // const message = 
            pubSub.publish('MESSAGE_ADDED', { messageAdded: {text} })
            return true;
        }
    },
    Subscription: {
        messageAdded: {
            subscribe: () => pubSub.asyncIterator('MESSAGE_ADDED'),
        },
    }
}

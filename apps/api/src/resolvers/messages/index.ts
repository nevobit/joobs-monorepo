import { createMessage, getAllMessages, getMyConversations, verifyToken } from '@joobs/business-logic';
import { PubSub } from 'graphql-subscriptions'
const pubSub = new PubSub();

const MESSAGE_ADDED = "MESSAGE_ADDED"

export default {
    Query: {
        messages: async (_:any, { receiverId }: { receiverId: string }, ctx:any ) => {
            const { id } = await verifyToken(ctx) as {id: string};
            await getMyConversations({ id });
            const messages = await getAllMessages({ receiver: receiverId, id })
            // pubSub.publish(MESSAGE_ADDED, { messageAdded: {} })
            return messages.items;
        },
        conversations: async (_:any, { }, ctx:any ) => {
            const { id } = await verifyToken(ctx) as {id: string};
            const conversations = await getMyConversations({ id });
            return conversations.items;
        },
    },
    Mutation: {
        createMessage: async (_:any, { data }: any, ctx:any ) => {
            try{
                const { id } = await verifyToken(ctx) as {id: string};
              
                const message = await createMessage({ receiverId: data.receiverId, text: data.text, senderId: id })
                pubSub.publish(MESSAGE_ADDED, { messageAdded: message })
                return message;
            }catch(err){
                console.log(err)
                return err
            }
        }
    },
    Subscription: {
        messageAdded: {
            subscribe: () => pubSub.asyncIterator(MESSAGE_ADDED),
        },
    }
}

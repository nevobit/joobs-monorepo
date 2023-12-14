import { isConnected, isRequest, myConnections, rejectConnection, sendConnection, verifyToken } from '@joobs/business-logic'

export default {
    Query: {
        isRequest: async (_: any, { data }: any, ctx: any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            const { receiverId } = data;
            const work = await isRequest({ senderId: id, receiverId });
            return work;
        },
        isConnected: async (_: any, { data }: any, ctx: any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            const { receiverId } = data;
            const work = await isConnected({ senderId: id, receiverId });
            return work;
        },
        connections: async (_: any, { id }: { id: string }, ctx: any) => {
            console.log("USER ID", id)
            const user = await verifyToken(ctx) as any;
            console.log(user)
            const ID = id ?? user.id;
            const connections = await myConnections(ID);
            return connections;
        },
    },
    Mutation: {
        connect: async (_: any, { data }: any, ctx: any) => {
            console.log("CONNECTION", data)
            const { id } = await verifyToken(ctx) as {id: string};
            const { receiverId } = data;
            const work = await sendConnection({ senderId: id, receiverId, status: "pending" });
            return work;
        },
        reject: async (_: any, { data }: any, ctx: any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            const { receiverId } = data;
            const work = await rejectConnection({ senderId: id, receiverId });
            return work;
        }
    }
}

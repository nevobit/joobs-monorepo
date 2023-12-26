import { blockUser, verifyToken } from '@joobs/business-logic'

export default {
    Mutation: {
        block: async (_: any, { data }: any, ctx: any) => {
            console.log("BLOCK", data)
            const { id } = await verifyToken(ctx) as {id: string};
            const { receiverId } = data;
            await blockUser({ senderId: id, receiverId, status: "blocked" });
            return true;
        }
    }
}

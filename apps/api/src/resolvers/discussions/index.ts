import { getAllDiscussions, createDiscussion, verifyToken } from '@joobs/business-logic'
export default {
    Query: {
        discussions: async () => {
            try{
                const discussions = await getAllDiscussions({});
                return discussions.items;
            }catch(err:any){
                throw new Error(err);
            }
        }
    },
    Mutation: {
        createDiscussion: async (_: any, {data}: any, ctx: any) => {
            const { uuid } = await verifyToken(ctx) as {uuid: string};
            const userId = uuid;
            const { title, description, images, link } = data;
            const discussion = await createDiscussion({title, description, images, link, userId, status: 'active' });
            return discussion;
        }
    }
}

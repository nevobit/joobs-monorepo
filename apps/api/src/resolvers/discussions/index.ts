import { getAllDiscussions, createDiscussion, verifyToken, getDiscussion } from '@joobs/business-logic'
export default {
    Query: {
        discussions: async () => {
            try{
                const discussions = await getAllDiscussions({});
                return discussions.items;
            }catch(err:any){
                throw new Error(err);
            }
        },
        discussion: async (_: any, {id}: {id: string}, _ctx: any) => {
            console.log(id)
            try{
                    // const { id } = await verifyToken(ctx) as {id: string};
                    const clubs = await getDiscussion({ discussionId: id });
                    console.log(clubs);
                    return clubs;
                    
                }catch(err:any){
                    throw new Error(err);
                }
        }
    },

    Mutation: {
        createDiscussion: async (_: any, {data}: any, ctx: any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            const userId = id;
            const { title, description, images, link } = data;
            const discussion = await createDiscussion({title, description, images, link, userId, status: 'active' });
            return discussion;
        }
    }
}

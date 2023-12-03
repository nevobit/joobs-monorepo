import { getAllDiscussions, createDiscussion, verifyToken, getDiscussion, getMyDiscussions } from '@joobs/business-logic'
export default {
    Query: {
        discussions: async (_:any, {}, ctx:any) => {
            try{
                const { id } = await verifyToken(ctx) as {id: string};
                const discussions = await getAllDiscussions({search: id});
                return discussions.items;
            }catch(err:any){
                console.log(err)
                throw new Error(err);
            }
        },
        discussion: async (_: any, {id}: {id: string}, ctx: any) => {
            const discussionId = id;    
            try{
                    const { id } = await verifyToken(ctx) as {id: string};
                    const userId = id;
                    const clubs = await getDiscussion({ discussionId, userId });
                    return clubs;
                    
                }catch(err:any){
                    throw new Error(err);
                }
        },
        myDiscussions: async (_:any, {}, ctx:any) => {
            try{
                const { id } = await verifyToken(ctx) as {id: string};
                const discussions = await getMyDiscussions({search: id});
                return discussions.items;
            }catch(err:any){
                console.log(err)
                throw new Error(err);
            }
        },
    },

    Mutation: {
        createDiscussion: async (_: any, {data}: any, ctx: any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            const userId = id;
            const { title, description, images, link, clubId } = data;
            const discussion = await createDiscussion({title, description, images, link, userId, clubId, status: 'active' });
            return discussion;
        }
    }
}

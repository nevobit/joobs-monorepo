import { createDislike, deleteDislike, getDislikes } from '@joobs/business-logic'

export default {
    Query: {
        dislikes: async (_: any, {id}: { id: string }, _ctx:any) => {
            try{
                const likes = await getDislikes({id});
                return likes;
            }catch(err:any){
                throw new Error(err);
            }
        },
    },
    Mutation: {
        dislike: async (_: any, { data }: any, _context: any) => {
            const { userId, discussionId } = data;
            const like = await createDislike({ userId, discussionId });
            return like;
        },
        dislikeDelete: async (_: any, { data }: any, _context: any) => {
            const { userId, discussionId } = data;
            const like = await deleteDislike(userId, discussionId);
            return like;       
        }
    }
}

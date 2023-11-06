import { createLike, deleteLike, getLikes } from '@joobs/business-logic'

export default {
    Query: {
        likes: async (_: any, {id}: { id: string }, _ctx:any) => {
            try{
                const likes = await getLikes({id});
                return likes;
            }catch(err:any){
                throw new Error(err);
            }
        },
    },
    Mutation: {
        like: async (_: any, { data }: any, _context: any) => {
            const { userId, discussionId } = data;
            const like = await createLike({ userId, discussionId });
            return like;
        },
        likeDelete: async (_: any, { data }: any, _context: any) => {
            const { userId, discussionId } = data;
            const like = await deleteLike(userId, discussionId);
            return like;       
        }
    }
}

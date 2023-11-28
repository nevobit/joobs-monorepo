import { createComment, getComments } from '@joobs/business-logic'
export default {
    Query: {
        comments: async (_: any, {id}: { id: string }, _ctx:any) => {
            try{
                const comments = await getComments({id});
                return comments;
            }catch(err:any){
                throw new Error(err);
            }
        },
    },
    Mutation: {
        comment: async (_: any, { data }: any, _context: any) => {
            const { text, userId, discussionId } = data;
            const comment = await createComment({ text, userId, discussionId });
            return comment;
        }
    }
}

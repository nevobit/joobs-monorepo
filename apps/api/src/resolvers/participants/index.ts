import { createParticipant, getParticipantsById, getUserParticipant, verifyToken } from '@joobs/business-logic'
export default {
    Query: {
        participants: async (_: any, {id}: { id: string }, _ctx:any) => {
            // await verifyToken(ctx);
            try{
                const participants = await getParticipantsById({ search: id});
                return participants.items;
            }catch(err:any){
                throw new Error(err);
            }
        },
        isParticipant: async (_: any, {}, ctx:any) => {
             const { id } = await verifyToken(ctx) as { id: string };
            try{
                const joined = await getUserParticipant(id);
                return joined;
            }catch(err:any){
                throw new Error(err);
            }
        },
    },
    Mutation: {
        participate: async (_: any, { data }: any, _context: any) => {
            const { userId, projectId } = data;
            const work = await createParticipant({ projectId, userId });
            return work;
        }
    }
}

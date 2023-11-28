import { createUsersOnClub, getUserJoined, getUsersOnClubsById, verifyToken } from '@joobs/business-logic'
export default {
    Query: {
        members: async (_: any, {id}: { id: string }, _ctx:any) => {
            // await verifyToken(ctx);
            try{
                const applications = await getUsersOnClubsById({ search: id});
                return applications.items;
            }catch(err:any){
                throw new Error(err);
            }
        },
        isJoined: async (_: any, {}, ctx:any) => {
             const { id } = await verifyToken(ctx) as { id: string };
            try{
                const joined = await getUserJoined(id);
                return joined;
            }catch(err:any){
                throw new Error(err);
            }
        },
    },
    Mutation: {
        joinToClub: async (_: any, { data }: any, _context: any) => {
            const { userId, clubId } = data;
            const work = await createUsersOnClub({ clubId, userId });
            return work;
        }
    }
}

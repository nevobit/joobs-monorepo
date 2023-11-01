import { getAllClubs, createClub, verifyToken, getClub } from '@joobs/business-logic'

export default {
    Query: {
        clubs: async (_: any, {}, ctx: any) => {
            try{
                const { id } = await verifyToken(ctx) as {id: string};

                const clubs = await getAllClubs({ search: id });
                return clubs.items;
            }catch(err:any){
                throw new Error(err);
            }
        },
        club: async (_: any, {id}: {id: string}, ctx: any) => {
            const clubId = id;    
            try{
                    const { id } = await verifyToken(ctx) as {id: string};
                    const userId = id;
                    const clubs = await getClub({ userId, clubId });
                    return clubs;
                }catch(err:any){
                    throw new Error(err);
                }
        }
    },
    Mutation: {
        createClub: async (_: any, {data}: any, _ctx: any) => {
            // await verifyToken(ctx) as {id: string};
            const { name, description, icon } = data;
            const club = await createClub({name, description, icon, status: 'active' });
            return club;
        }
    }
}

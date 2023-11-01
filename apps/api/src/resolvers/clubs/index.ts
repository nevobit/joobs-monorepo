import { getAllClubs, createClub } from '@joobs/business-logic'

export default {
    Query: {
        clubs: async () => {
            try{
                const clubs = await getAllClubs({});
                return clubs.items;
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

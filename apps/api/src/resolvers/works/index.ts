import { getAllWorks, createWork, getWorkById, verifyToken, getWorkByUserId } from '@joobs/business-logic'
export default {
    Query: {
        works: async () => {
            try{
                const works = await getAllWorks({});
                return works.items;
            }catch(err:any){
                throw new Error(err);
            }
        },
        work: async (_: any, {id}: {id: string}, _ctx:any) => {
            // const { id } = await verifyToken(ctx) as {id: string};
            // console.log(id);
            try{
                const work = await getWorkById(id);
                return work;
            }catch(err:any){
                console.log(err);
                throw new Error(err);
            }
        },
        workByUser: async (_: any, {}, ctx:any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            try{
                const work = await getWorkByUserId(id);
                return work;
            }catch(err:any){
                console.log(err);
                throw new Error(err);
            }
        }
    },
    Mutation: {
        createWork: async (_: any, {data}: any, _context: any) => {
            const { title, description, skills, status, role, userId, location, remuneration } = data;
            const work = await createWork({title, description, skills, status, role, userId, location, remuneration});
            return work;
        }
    }
}

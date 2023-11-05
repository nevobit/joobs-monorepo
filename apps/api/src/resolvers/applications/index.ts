import { getWorkById, getApplicationsById, verifyToken, createApplication, getUserApplied } from '@joobs/business-logic'
export default {
    Query: {
        applications: async (_: any, {}, ctx:any) => {
            const { id } = await verifyToken(ctx) as {id: string};

            try{
                const applications = await getApplicationsById({ search: id});
                return applications.items;
            }catch(err:any){
                throw new Error(err);
            }
        },
        application: async (_: any, {id}: {id: string}, _ctx:any) => {
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
        applied: async (_: any, {}, ctx:any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            try{
                const applied = await getUserApplied(id);
                return applied;
            }catch(err:any){
                console.log(err);
                throw new Error(err);
            }
        }
    },
    Mutation: {
        createApplication: async (_: any, {data}: any, _context: any) => {
            const { userId, workId, proof_of_work } = data;
            const work = await createApplication({ workId, userId, proof_of_work });
            return work;
        }
    }
}

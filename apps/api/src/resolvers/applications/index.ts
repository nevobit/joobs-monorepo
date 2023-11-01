import { createWork, getWorkById, getApplicationsById, verifyToken } from '@joobs/business-logic'
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
        }
    },
    Mutation: {
        createApplication: async (_: any, {data}: any, _context: any) => {
            const { title, description, skills, status, role, userId, location, remuneration } = data;
            const work = await createWork({title, description, skills, status, role, userId, location, remuneration});
            return work;
        }
    }
}

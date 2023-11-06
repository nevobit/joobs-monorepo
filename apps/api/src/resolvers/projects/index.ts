import { createProject, getAllProjects, getProjectById } from '@joobs/business-logic'
export default {
    Query: {
        projects: async () => {
            try{
                const projects = await getAllProjects({});
                return projects.items;
            }catch(err:any){
                throw new Error(err);
            }
        },
        project: async (_: any, {id}: {id: string}, _ctx:any) => {
            // const { id } = await verifyToken(ctx) as {id: string};
            // console.log(id);
            try{
                const project = await getProjectById(id);
                return project;
            }catch(err:any){
                throw new Error(err);
            }
        },
        // workByProject: async (_: any, {}, ctx:any) => {
        //     const { id } = await verifyToken(ctx) as {id: string};
        //     try{
        //         const work = await getWorkByUserId(id);
        //         return work;
        //     }catch(err:any){
        //         console.log(err);
        //         throw new Error(err);
        //     }
        // }
    },
    Mutation: {
        createProject: async (_: any, {data}: any, _context: any) => {
            const project = await createProject({...data, status: 'active'});
            return project;
        }
    }
}

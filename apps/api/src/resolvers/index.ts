import { getAllWorks, createWork, getAllProjects } from '@joobs/business-logic'
export default {
    Query: {
        works: async () => {
            try{
                const works = await getAllWorks({});
                console.log("WORKSS", works.items);
                return works.items;
            }catch(err:any){
                throw new Error(err);
            }
        },
        projects: async () => {
            try{
                const projects = await getAllProjects({});
                console.log("PROJECTS", projects.items);
                return projects.items;
            }catch(err:any){
                throw new Error(err);
            }
        }
    },
    Mutation: {
        createWork: async (_: any, {data}: any, _context: any) => {
            console.log(data);
            const { title, description, skills, status, role, user, location, remuneration } = data;
            const work = await createWork({title, description, skills, status, role, user, location, remuneration});
            return work;
        },
        createProject: async (_: any, {data}: any, _context: any) => {
            console.log(data);
            const { title, description, skills, status, role, user, location, remuneration } = data;
            const project = await createWork({title, description, skills, status, role, user, location, remuneration});
            return project;
        }
    }
}

export const getData = () => {
   
}
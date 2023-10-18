import { getAllWorks, createWork } from '@joobs/business-logic'
export default {
    Query: {
        works: async () => {
            try{
                const works = await getAllWorks({});
                return works.items;
            }catch(err:any){
                throw new Error(err);
            }
        }
    },
    Mutation: {
        createWork: async (_: any, {data}: any, _context: any) => {
            const { title, description, skills, status, role, user, location, remuneration } = data;
            const work = await createWork({title, description, skills, status, role, user, location, remuneration});
            console.log({work});
            return work;
        }
    }
}

export const getData = () => {
   
}
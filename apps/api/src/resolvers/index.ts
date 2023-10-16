import { getAllWorks, createWork } from '@joobs/business-logic'
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
        }
    },
    Mutation: {
        createWork: async (_: any, {data}: any, _context: any) => {
            console.log(data);
            const { title, description, skills, status, role, user, location, remuneration } = data;
            const work = await createWork({title, description, skills, status, role, user, location, remuneration});
            return work;
        }
    }
}

export const getData = () => {
   
}
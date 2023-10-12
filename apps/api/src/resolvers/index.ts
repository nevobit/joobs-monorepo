import { getAllWorks } from '@joobs/business-logic'
export default {
    Query: {
        async getData(){
            const works = await getAllWorks({});
            console.log(works);
            return 'ALL OKAY';
        }
    }
}

export const getData = () => {
   
}
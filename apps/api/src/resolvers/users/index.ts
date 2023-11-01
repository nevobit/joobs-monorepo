
import { getUserById, verifyToken } from  '@joobs/business-logic'

export default {
    Query: {
        user: async (_: any, {}, ctx:any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            console.log(id);
            try{
                const user = await getUserById(id);
                return user;
            }catch(err:any){
                console.log(err);
                throw new Error(err);
            }
        }
    },
}
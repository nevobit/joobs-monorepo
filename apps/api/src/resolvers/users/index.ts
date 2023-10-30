
import { getUserById, verifyToken } from  '@joobs/business-logic'

export default {
    Query: {
        user: async (_: any, {}, ctx:any) => {
            const { uuid } = await verifyToken(ctx) as {uuid: string};
            console.log(uuid);
            try{
                const user = await getUserById(uuid);
                return user;
            }catch(err:any){
                console.log(err);
                throw new Error(err);
            }
        }
    },
}
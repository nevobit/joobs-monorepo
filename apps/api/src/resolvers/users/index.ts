
import { getAllUser, getUserById, updateUser, verifyToken } from  '@joobs/business-logic'

export default {
    Query: {
        user: async (_: any, { uuid }: any, ctx:any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            const userId = uuid ?? id;
            try{
                const user = await getUserById(userId);
                return user;
            }catch(err:any){
                throw new Error(err);
            }
        },
        users: async (_: any, {}, _ctx:any) => {
            try{
                const users = await getAllUser();
                return users;
            }catch(err:any){
                throw new Error(err);
            }
        }
    },
    Mutation: {
        updateUser: async (_: any, {data}: any, ctx:any) => {
            const { id } = await verifyToken(ctx) as {id: string};
            try{
                const users = await updateUser({...data, id});
                return users;
            }catch(err:any){
                throw new Error(err);
            }
        }
    }
}
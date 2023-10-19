
import { login } from  '@joobs/business-logic'

export default {
    Mutation: {
        userLogin: async (_:any, { email }: {email: string}, _context: any) => {
            const result = await login({email});
            
            if(result instanceof Error){
                return new Error('Invalid credentials');
            }

            return result;
        }
    }
}
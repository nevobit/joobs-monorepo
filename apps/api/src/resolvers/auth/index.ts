
import { login, registerUser, verifyCode } from  '@joobs/business-logic'

export default {
    Mutation: {
        userLogin: async (_:any, { email }: {email: string}, _context: any) => {
            const result = await login({email});
            
            if(result instanceof Error){
                return new Error('Invalid credentials');
            }

            return result;
        },
        verifyCode: async (_:any, { email, code }: {code: number, email: string}, _context: any) => {
            console.log({email})
            const result = await verifyCode({code, email});
            console.log({result})
            if(result instanceof Error){
                return new Error('Invalid credentials');
            }

            return {token: result.token};
        },
        userRegister: async (_:any, { data }: any, _context: any) => {
            console.log({data})
            const result = await registerUser(data);
            console.log({result})
            if(result instanceof Error){
                return new Error('Invalid credentials');
            }

            return {token: result.token};
        }
    }
}

import { login, loginGoogle, registerUser, verifyCode } from  '@joobs/business-logic'

export default {
    Mutation: {
        userLogin: async (_:any, { email }: {email: string}, _context: any) => {
            const result = await login({email});
            
            if(result instanceof Error){
                return new Error('Invalid credentials');
            }

            return result;
        },
        userLoginGoogle: async (_:any, { email }: {email: string}, _context: any) => {
            const result = await loginGoogle({email});
            
            if(result instanceof Error){
                return new Error('Invalid credentials');
            }

            return result;
        },
        verifyCode: async (_:any, { email, code }: {code: number, email: string}, _context: any) => {
            const result = await verifyCode({code, email});
            if(result instanceof Error){
                return new Error('Invalid credentials');
            }

            return {token: result.token};
        },
        userRegister: async (_:any, { data }: any, _context: any) => {
            const result = await registerUser(data);
            if(result instanceof Error){
                return new Error('Invalid credentials');
            }

            return {token: result.token};
        }
    }
}
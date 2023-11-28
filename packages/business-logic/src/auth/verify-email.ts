import { clientDb } from "@joobs/data-sources";
import { User, users } from "@joobs/entities";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { sign } from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const verifyEmail =async ({email}: Partial<User>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users } })  
    
    const result = await db.select().from(users).where(and(eq(users!.email, email!)));

    const user = result[0];

    if(!user){
        throw new Error('User don\'t exist');
    }

    // Send email logic

    user.last_login = new Date().toString();

    const token = sign({id: user.id}, JWT_SECRET!, { expiresIn: '15d' });

    return { token };

}
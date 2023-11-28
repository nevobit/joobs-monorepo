import { clientDb } from "@joobs/data-sources";
import { User, users } from "@joobs/entities";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { sign } from "jsonwebtoken";
const { JWT_SECRET } = process.env;

interface UserToken {
    token: string;
}

export const registerUser = async (data: User): Promise<UserToken | Error> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users } })
  
    
    const result = await db.update(users)
        .set(data)
        .where(eq(users.email, data.email))
        .returning();

    const token = sign({id: result[0].id}, JWT_SECRET!, { expiresIn: '15d' });
    return { token };
}
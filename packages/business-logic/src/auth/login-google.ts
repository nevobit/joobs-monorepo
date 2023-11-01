import { getDbInstance } from "@joobs/data-sources";
import { users } from "@joobs/entities";
import { and, eq } from "drizzle-orm";
import { sign } from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const loginGoogle =async ({email}: {email: string}) => {
    const result = await getDbInstance().select().from(users).where(and(eq(users!.email, email!)));
    let user = result[0];
    let type = 'login';
    if(!user){
        const data = { email, status: 'active', last_login:  new Date().toString()}
        const result = await getDbInstance().insert(users).values(data).returning();
        user = result[0];
        type = 'register';
    }

    await getDbInstance().update(users)
        .set({ method: 'google', last_login: new Date().toString()  })
        .where(eq(users.id, user.id))
        .returning();

    const token = sign({id: user.id}, JWT_SECRET!, { expiresIn: '15d' });

    return { token, type };
}
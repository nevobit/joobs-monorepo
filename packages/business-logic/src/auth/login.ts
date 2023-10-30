import { getDbInstance } from "@joobs/data-sources";
import { users } from "@joobs/entities";
import { and, eq } from "drizzle-orm";
import { sendEmail } from "../mailing";
import { sign } from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const login =async ({email}: {email: string}) => {
    const result = await getDbInstance().select().from(users).where(and(eq(users!.email, email!)));
    let user = result[0];
    let type = 'login';
    if(!user){
        const data = { email, status: 'active', last_login:  new Date().toString()}
        const result = await getDbInstance().insert(users).values(data).returning();
        user = result[0];
        type = 'register';
    }

    const code = await sendEmail({email}, 'verification', true);

    await getDbInstance().update(users)
        .set({ code: Number(code), last_login: new Date().toString()  })
        .where(eq(users.uuid, user.uuid))
        .returning();

    const token = sign({uuid: user.uuid}, JWT_SECRET!, { expiresIn: '15d' });

    return { token, type };
}
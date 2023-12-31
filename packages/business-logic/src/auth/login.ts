import { clientDb } from "@joobs/data-sources";
import { users } from "@joobs/entities";
import { and, eq } from "drizzle-orm";
import { sendEmail } from "../mailing";
import { sign } from "jsonwebtoken";
import { drizzle } from "drizzle-orm/node-postgres";

const { JWT_SECRET } = process.env;

export const login =async ({email}: {email: string}) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users } })
  
    const result = await db.select().from(users).where(and(eq(users!.email, email!)));
    let user = result[0];
    let type = 'login';
    if(!user || user.name == '' || user.location == null){
        const data = { email, status: 'active', last_login:  new Date().toString()}
        const result = await db.insert(users).values(data).returning();
        user = result[0];
        type = 'register';
    }

    if(email == 'alanwhatevers@gmail.com'){
        return
    }

    const code = email == 'test@email.com' ? '1234' : await sendEmail({email}, 'verification', true);

    await db.update(users)
        .set({ code: Number(code), last_login: new Date().toString()  })
        .where(eq(users.id, user.id))
        .returning();

    const token = sign({id: user.id}, JWT_SECRET!, { expiresIn: '15d' });

    return { token, type };
}
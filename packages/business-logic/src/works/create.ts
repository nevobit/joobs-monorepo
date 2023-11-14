import { clientDb } from "@joobs/data-sources";
import { users, works } from "@joobs/entities";
import { InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { sendEmailCreatedWork } from "../mailing";

export const createWork = async (data: InferInsertModel<typeof works>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { works } })
  
    const result = await db.insert(works).values(data).returning();
    const usersResult = await db.select().from(users);

    const activeUser = usersResult.filter(user => user.email !== 'test@email.com	');

    await Promise.all(activeUser.map(async (element) => {
        await sendEmailCreatedWork({ title: result[0].title, email: element.email }, 'created' );
    }));
    return result[0];
}


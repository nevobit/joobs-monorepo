import { works, users, workRelations, clubs, applicationsRelations, saved, savedRelations  } from "@joobs/entities";
import { clientDb } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
// 
export const getMySaveds = async (id: string): Promise<any> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users, works, applicationsRelations, workRelations, clubs, saved, savedRelations } })

    const result = await db.query.saved.findMany({
        where: eq(saved.userId, id!),
        with: {
            discussion: true
        }
    });

    const myClubs  = result.map((discussion) => {
        return discussion.discussion;
    })

    return myClubs;
}
import { works, users, workRelations,  applicationsRelations, participants, participantsRelations  } from "@joobs/entities";
import { clientDb } from '@joobs/data-sources'
// import { eq } from 'drizzle-orm'
import { drizzle } from "drizzle-orm/node-postgres";
import { and, eq } from "drizzle-orm";
// 
export const getUserParticipant = async (projectId: string, id: string): Promise<Boolean> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users, works, applicationsRelations, workRelations, participants, participantsRelations } })

    const result = await db.query.participants.findMany({
        where: and(eq(participants.userId, id), eq(participants.projectId, projectId)),
    });

    const isJoined = result.length > 0;

    return isJoined
}
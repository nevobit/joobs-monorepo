import { clientDb } from "@joobs/data-sources";
import { connections } from "@joobs/entities";
import { InferInsertModel, and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const rejectConnection = async (data: InferInsertModel<typeof connections>) => {
    const infoInstance = await clientDb();
    const db = drizzle(infoInstance, { schema: { connections } })

    await db.delete(connections).where(and(eq(connections.senderId, data.senderId), eq(connections.receiverId, data.receiverId), eq(connections.status, "pending")))

    return true;
}
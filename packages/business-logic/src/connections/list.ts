import { clientDb } from "@joobs/data-sources";
import { connections } from "@joobs/entities";
import { eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const myConnections = async (id: string) => {
    const infoInstance = await clientDb();
    const db = drizzle(infoInstance, { schema: { connections } })

    const result = await db.select().from(connections).where(or(eq(connections.senderId, id), eq(connections.receiverId, id), eq(connections.status, "accepted")));
    
    return result.length;
}


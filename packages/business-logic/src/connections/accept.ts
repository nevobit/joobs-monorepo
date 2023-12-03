import { clientDb } from "@joobs/data-sources";
import { connections } from "@joobs/entities";
import { InferInsertModel, and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const acceptConnection = async (data: InferInsertModel<typeof connections>) => {
    const infoInstance = await clientDb();
    const db = drizzle(infoInstance, { schema: { connections } })
          // Verificar si existe una solicitud pendiente entre los usuarios
    const connectionRequest = await db
            .select().from(connections)
            .where(and(eq(connections.senderId, data.senderId), eq(connections.receiverId, data.receiverId)))
      
          if (connectionRequest.length <= 0) {
            return;
          }
      
          const result = await db.update(connections).set({ status: "accepted" }).where(eq(connections.receiverId, data.receiverId)).returning();
      
          return result[0];
}


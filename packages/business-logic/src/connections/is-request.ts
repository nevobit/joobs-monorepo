import { clientDb } from "@joobs/data-sources";
import { connections } from "@joobs/entities";
import { InferInsertModel, and, eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const isRequest = async (data: InferInsertModel<typeof connections>) => {
  const infoInstance = await clientDb();
  const db = drizzle(infoInstance, { schema: { connections } });

  const existingConnection = await db
    .select()
    .from(connections)
    .where(
      or(
        and(
          eq(connections.senderId, data.senderId),
          eq(connections.receiverId, data.receiverId),
          eq(connections.status, "pending"),
        ),
        and(
          eq(connections.senderId, data.receiverId),
          eq(connections.receiverId, data.senderId),
          eq(connections.status, "pending"),
        )
      )
    );
  if (existingConnection.length > 0) {
    return true;
  }

  return false;
};

import { clientDb } from "@joobs/data-sources";
import { blocks } from "@joobs/entities";
import { InferInsertModel, and, eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const blockUser = async (data: InferInsertModel<typeof blocks>) => {
  const infoInstance = await clientDb();
  const db = drizzle(infoInstance, { schema: { blocks } });

  const existingConnection = await db
    .select()
    .from(blocks)
    .where(
      or(
        and(
          eq(blocks.senderId, data.senderId),
          eq(blocks.receiverId, data.receiverId)
        ),
        and(
          eq(blocks.senderId, data.receiverId),
          eq(blocks.receiverId, data.senderId)
        )
      )
    );
  if (existingConnection.length > 0) {
    return;
  }

  const newBlock = await db.insert(blocks).values(data).returning();
  return newBlock;
};

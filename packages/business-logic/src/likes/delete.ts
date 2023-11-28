import { clientDb } from "@joobs/data-sources";
import { likes } from "@joobs/entities";
import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const deleteLike = async (userId: string, discussionId: string) => {
  try {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { likes } })
  
    await db.delete(likes).where(and(eq(likes.userId, userId), eq(likes.discussionId, discussionId)))
    return true;
  } catch (error: any) {
    throw new Error(`Error al eliminar el like: ${String(error.message)}`);
  }
};

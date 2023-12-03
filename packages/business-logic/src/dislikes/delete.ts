import { clientDb } from "@joobs/data-sources";
import { dislikes } from "@joobs/entities";
import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const deleteDislike = async (userId: string, discussionId: string) => {
  try {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { dislikes } })
  
    await db.delete(dislikes).where(and(eq(dislikes.userId, userId), eq(dislikes.discussionId, discussionId)))
    return true;
  } catch (error: any) {
    throw new Error(`Error al eliminar el dislike: ${String(error.message)}`);
  }
};

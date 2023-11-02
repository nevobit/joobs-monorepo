import { getDbInstance } from "@joobs/data-sources";
import { likes } from "@joobs/entities";
import { eq, and } from "drizzle-orm";

export const deleteLike = async (userId: string, discussionId: string) => {
  try {
    const db = getDbInstance();
    await db.delete(likes).where(and(eq(likes.userId, userId), eq(likes.discussionId, discussionId)))
    return true;
  } catch (error: any) {
    throw new Error(`Error al eliminar el like: ${String(error.message)}`);
  }
};

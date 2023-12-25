import { clientDb } from "@joobs/data-sources";
import {  discussions } from "@joobs/entities";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const voteForDiscussionOption = async (
  userId: string,
  discussionId: string,
  optionId: string
) => {
  try {
    const infoInstance = await clientDb();
    const db = drizzle(infoInstance, { schema: { discussions } });

    // Obtener la discusión actual
    const result = await db
      .select()
      .from(discussions)
      .where(eq(discussions.id, discussionId));

    const discussion = result[0];

    if (!discussion.voters) return;
    if (!discussion.poll) return;

    const updatedPoll = discussion.poll.map((pollOption: any) =>
      pollOption.id === optionId
        ? { ...pollOption, votes: pollOption.votes + 1 }
        : pollOption
    );

    // Verificar si el usuario ya votó en esta discusión
    if (discussion.voters.includes(userId)) {
      return;
    }

    // Actualizar la lista de votantes en la discusión
    await db
      .update(discussions)
      .set({ voters: [...discussion.voters, userId], poll: updatedPoll })
      .where(eq(discussions.id, discussionId))
      .returning();

    return discussion;
  } catch (error) {
    console.error("Error al votar en la discusión:", error);
    return { success: false, message: "Error al procesar el voto." };
  }
};

// import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { discussions } from "../../discussions";
import { users } from "../../users";

export const dislikes = pgTable('dislikes', {
    userId: uuid('user_id'),
    discussionId: uuid('discussion_id'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (dislikes) => {
    return {
        cpk: primaryKey(dislikes.userId, dislikes.discussionId),
    }
});

export const dislikeRelations = relations(dislikes, ({ one }) => ({
    discussion: one(discussions, {
        fields: [dislikes.discussionId],
        references: [discussions.id]
    }),
    user: one(users, {
        fields: [dislikes.userId],
        references: [users.id]
    })
}))

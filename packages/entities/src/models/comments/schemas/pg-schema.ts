// import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { discussions } from "../../discussions";
import { users } from "../../users";

export const comments = pgTable('comments', {
    id: uuid('id').defaultRandom(),
    text: text('text'),
    userId: uuid('user_id'),
    discussionId: uuid('discussion_id'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (comments) => {
    return {
        cpk: primaryKey(comments.id),
    }
});

export const commentRelations = relations(comments, ({ one }) => ({
    discussion: one(discussions, {
        fields: [comments.discussionId],
        references: [discussions.id]
    }),
    user: one(users, {
        fields: [comments.userId],
        references: [users.id]
    })
}))

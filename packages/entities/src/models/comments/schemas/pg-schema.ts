// import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { discussions } from "../../discussions";

export const comments = pgTable('comments', {
    text: text('text'),
    userId: uuid('user_id'),
    discussionId: uuid('discussion_id'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (comments) => {
    return {
        cpk: primaryKey(comments.userId, comments.discussionId),
    }
});

export const commentRelations = relations(comments, ({ one }) => ({
    discussion: one(discussions, {
        fields: [comments.discussionId],
        references: [discussions.id]
    })
}))

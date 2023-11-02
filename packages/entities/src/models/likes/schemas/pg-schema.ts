// import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { discussions } from "../../discussions";
import { users } from "../../users";

export const likes = pgTable('likes', {
    userId: uuid('user_id'),
    discussionId: uuid('discussion_id'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (likes) => {
    return {
        cpk: primaryKey(likes.userId, likes.discussionId),
    }
});

export const likeRelations = relations(likes, ({ one }) => ({
    discussion: one(discussions, {
        fields: [likes.discussionId],
        references: [discussions.id]
    }),
    user: one(users, {
        fields: [likes.userId],
        references: [users.id]
    })
}))

import { relations } from 'drizzle-orm';
import { pgTable,  timestamp, uuid,  primaryKey } from 'drizzle-orm/pg-core';
import { users } from '../../users';
import { discussions } from '../../discussions';

export const saved = pgTable('saved', {
    userId: uuid('user_id').notNull(),
    discussionId: uuid('discussion_id').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (saved) => ({
    pk: primaryKey(saved.userId, saved.discussionId),
}),
);

export const savedRelations = relations(saved, ({ one }) => ({
	discussion: one(discussions, {
		fields: [saved.discussionId],
		references: [discussions.id],
	}),
	user: one(users, {
		fields: [saved.userId],
		references: [users.id],
	}),
}));
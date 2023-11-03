import { relations } from 'drizzle-orm';
import { pgTable,  timestamp, uuid,  primaryKey } from 'drizzle-orm/pg-core';
import { users } from '../../users';
import { projects } from '../../projects';

export const participants = pgTable('participants', {
    userId: uuid('user_id').notNull(),
    projectId: uuid('work_id').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (t) => ({
    pk: primaryKey(t.userId, t.projectId),
}),
);

export const participantsRelations = relations(participants, ({ one }) => ({
	project: one(projects, {
		fields: [participants.projectId],
		references: [projects.id],
	}),
	user: one(users, {
		fields: [participants.userId],
		references: [users.id],
	}),
}));
import { relations } from 'drizzle-orm';
import { pgTable,  timestamp, uuid,  primaryKey, varchar } from 'drizzle-orm/pg-core';
import { users } from '../../users';
import { works } from '../../works';

export const applications = pgTable('applications', {
    userId: uuid('user_id').notNull(),
    workId: uuid('work_id').notNull(),
	proof_of_work: varchar('proof_of_work', { length: 256 }),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (t) => ({
    pk: primaryKey(t.userId, t.workId),
}),
);

export const applicationsRelations = relations(applications, ({ one }) => ({
	work: one(works, {
		fields: [applications.workId],
		references: [works.id],
	}),
	user: one(users, {
		fields: [applications.userId],
		references: [users.id],
	}),
}));
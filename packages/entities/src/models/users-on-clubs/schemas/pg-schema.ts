import { relations } from 'drizzle-orm';
import { pgTable,  timestamp, uuid,  primaryKey } from 'drizzle-orm/pg-core';
import { users } from '../../users';
import { clubs } from '../../clubs';

export const usersOnClub = pgTable('usersOnClub', {
    userId: uuid('user_id').notNull(),
    clubId: uuid('work_id').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (t) => ({
    pk: primaryKey(t.userId, t.clubId),
}),
);

export const usersOnClubRelations = relations(usersOnClub, ({ one }) => ({
	club: one(clubs, {
		fields: [usersOnClub.clubId],
		references: [clubs.id],
	}),
	user: one(users, {
		fields: [usersOnClub.userId],
		references: [users.id],
	}),
}));
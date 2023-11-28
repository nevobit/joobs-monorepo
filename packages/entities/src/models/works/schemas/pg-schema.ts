import { relations } from 'drizzle-orm';
import { jsonb, pgTable,  timestamp, text, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from '../../users';

export const works = pgTable('works', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 256 }).notNull(),
    skills: text('skills').array().$type<Array<string>>(),
    role: varchar('role', { length: 256 }),
    location: jsonb('location'),
    remuneration: jsonb('remuneration'),
    userId: uuid('user_id'),
    description: varchar('description'), 
    status: varchar('status', { length: 256 }),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (works) => {
    return {
        idIndex: uniqueIndex('works_id_index').on(works.id)
    }
});

export const workRelations = relations(works, ({ one }) => ({
    user: one(users, {
        fields: [works.userId],
        references: [users.id]
    })
}))
import { jsonb, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

export const works = pgTable('works', {
    uuid: uuid('id').defaultRandom().notNull().primaryKey().unique(),
    title: varchar('title', { length: 256 }).notNull(),
    skills: text('skills'),
    role: varchar('role', { length: 256 }),
    location: jsonb('location'),
    remuneration: jsonb('remuneration'),
    user: varchar('user', { length: 256 }),
    description: varchar('description'), 
    status: varchar('status', { length: 256 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (works) => {
    return {
        idIndex: uniqueIndex('works_id_index').on(works.uuid)
    }
});

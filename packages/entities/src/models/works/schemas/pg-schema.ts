// import { relations } from 'drizzle-orm';
import { jsonb, pgTable,  timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';
// import { users } from '../../users';

export const works = pgTable('works', {
    uuid: uuid('id').defaultRandom().notNull(),
    title: varchar('title', { length: 256 }).notNull(),
    skills: varchar('skills', { length: 256 }).array(),
    role: varchar('role', { length: 256 }),
    location: jsonb('location'),
    remuneration: jsonb('remuneration'),
    user: uuid('user').notNull(),
    description: varchar('description'), 
    status: varchar('status', { length: 256 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (works) => {
    return {
        idIndex: uniqueIndex('works_id_index').on(works.uuid)
    }
});

// export const workRelations = relations(works, ({ one }) => ({
//     user: one(users, {
//         fields: [works.userId],
//         references: [users.uuid]
//     })
// }))
import { pgTable, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    uuid: uuid('id').defaultRandom().notNull(),
    title: varchar('name', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull(),
    last_login: varchar('email', { length: 256 }).notNull(),
    status: varchar('status', { length: 256 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (users) => {
    return {
        idIndex: uniqueIndex('projects_id_index').on(users.uuid)
    }
})
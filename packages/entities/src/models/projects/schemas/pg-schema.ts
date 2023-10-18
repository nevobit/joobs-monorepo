import { pgTable, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const projects = pgTable('projects', {
    uuid: uuid('id').defaultRandom().notNull(),
    title: varchar('title', { length: 256 }).notNull(),
    status: varchar('status', { length: 256 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    user: varchar('user', { length: 256 }),
}, (projects) => {
    return {
        idIndex: uniqueIndex('projects_id_index').on(projects.uuid)
    }
})
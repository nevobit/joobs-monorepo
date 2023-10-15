import { pgTable, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const projects = pgTable('projects', {
    uuid: uuid('id').defaultRandom().notNull(),
    title: varchar('title', { length: 256 }).notNull(),
    status: varchar('status', { length: 256 }).notNull()
}, (projects) => {
    return {
        idIndex: uniqueIndex('projects_id_index').on(projects.uuid)
    }
})
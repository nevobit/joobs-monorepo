import { jsonb, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const projects = pgTable('projects', {
    id: uuid('id').defaultRandom().notNull(),
    title: varchar('title', { length: 256 }).notNull(),
    status: varchar('status', { length: 256 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    description: text('description'),
    stages: jsonb('stages').array(),
    skills: varchar('skills').array(),
    difficulty: varchar('difficulty', { length: 256 }),
    duration: varchar('duration', { length: 256 }),
    reward: varchar('reward', { length: 256 }),
    submission: varchar('submission', { length: 256 }),
    prerequisites: varchar('prerequisites', { length: 256 }),
}, (projects) => {
    return {
        idIndex: uniqueIndex('projects_id_index').on(projects.id)
    }
})
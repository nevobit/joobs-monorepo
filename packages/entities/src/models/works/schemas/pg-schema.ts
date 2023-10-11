import { pgTable, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';


export const works = pgTable('works', {
    uuid: uuid('id').defaultRandom().notNull(),
    title: varchar('title', { length: 256 }).notNull()
}, (works) => {
    return {
        idIndex: uniqueIndex('works_id_index').on(works.uuid)
    }
})
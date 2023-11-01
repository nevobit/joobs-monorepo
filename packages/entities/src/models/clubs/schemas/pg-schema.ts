// import { relations } from "drizzle-orm";
// import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
// import { usersOnClubs } from "../../users";

export const clubs = pgTable('clubs', {
    id: uuid('id').defaultRandom().notNull(),
    name: varchar('name', { length: 256 }),
    description: text('description'),
    icon: varchar('icon', { length: 256 }),
    status: varchar('status', { length: 256 }),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (clubs) => {
    return {
        idIndex: uniqueIndex('clubs_id_index').on(clubs.id)
    }
});


// export const clubRelations = relations(clubs, ({ many }) => ({
//     : many(usersOnClubs)
// }))


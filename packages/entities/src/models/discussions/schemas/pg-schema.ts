// import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "../../users";
import { relations } from "drizzle-orm";

export const discussions = pgTable('discussions', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 256 }),
    description: text('description'),
    images: varchar('images', { length: 256 }).array(),
    link: varchar("link", { length: 256 }),
    status: varchar('status', { length: 256 }),
    userId: uuid('user_id'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (discussions) => {
    return {
        cpk: primaryKey(discussions.userId),
        idIndex: uniqueIndex('discussions_id_index').on(discussions.id)
    }
});


export const discussionRelations = relations(discussions, ({ one }) => ({
    user: one(users, {
        fields: [discussions.userId],
        references: [users.id]
    })
}))

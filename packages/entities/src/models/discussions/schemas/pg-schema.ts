// import { relations } from "drizzle-orm";
import { boolean, jsonb, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "../../users";
import { relations } from "drizzle-orm";
import { comments } from "../../comments";
import { likes } from "../../likes";
import { clubs } from "../../clubs";

export const discussions = pgTable('discussions', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 256 }),
    description: text('description'),
    images: varchar('images', { length: 256 }).array(),
    isPoll: boolean("isPoll").default(false),
    poll: jsonb('poll').array(),
    link: varchar("link", { length: 256 }),
    status: varchar('status', { length: 256 }),
    voters: varchar('voters').array(),
    userId: uuid('user_id'),
    clubId: uuid('club_id'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (discussions) => {
    return {
        idIndex: uniqueIndex('discussions_id_index').on(discussions.id)
    }
});


export const discussionRelations = relations(discussions, ({ one, many }) => ({
    user: one(users, {
        fields: [discussions.userId],
        references: [users.id]
    }),
    comments: many(comments),
    likes: many(likes),
    club: one(clubs, {
        fields: [discussions.clubId],
        references: [clubs.id]
    }),
}))

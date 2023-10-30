import { relations } from "drizzle-orm";
import { integer, jsonb, pgTable, primaryKey, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { discussions } from "../../discussions";

export const users = pgTable('users', {
    uuid: uuid('id').defaultRandom().notNull().unique().primaryKey(),
    name: varchar('name', { length: 256 }),
    phone: varchar('phone', { length: 256 }),
    photo: varchar('photo', { length: 256 }),
    location: jsonb('location'),
    skills: varchar("images", { length: 256 }).array(),
    method: varchar('method', { length: 256 }),
    company_name: varchar('company_name', { length: 256 }),
    headline: varchar('headline', { length: 256 }),
    username: varchar('username', { length: 256 }),
    about: text('about'),
    born_date: varchar('born_date', { length: 256 }),
    code: integer('code'),
    gender: varchar('gender', { length: 256 }),
    email: varchar('email', { length: 256 }).notNull(),
    last_login: varchar('last_login', { length: 256 }).notNull(),
    status: varchar('status', { length: 256 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (users) => {
    return {
        idIndex: uniqueIndex('users_id_index').on(users.uuid),
        pk: primaryKey(users.uuid)
    }
});

export const userRelations = relations(users, ({ many }) => ({
    discussions: many(discussions)
}))

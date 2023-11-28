import { integer, jsonb, pgTable, primaryKey, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { discussions } from "../../discussions";
import { works } from "../../works";
import { applications } from "../../applications";
import { usersOnClub } from "../../users-on-clubs";
import { participants } from "../../participants";

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 256 }),
    phone: varchar('phone', { length: 256 }),
    photo: varchar('photo', { length: 256 }),
    location: jsonb('location'),
    skills: varchar("images", { length: 256 }).array(),
    method: varchar('method', { length: 256 }),
    company_name: varchar('company_name', { length: 256 }),
    college: varchar('college', { length: 256 }),
    icebreaker: text('icebreaker').array(),
    instagram: varchar('instagram', { length: 256 }),
    facebook: varchar('facebook', { length: 256 }),
    linkedin: varchar('linkedin', { length: 256 }),
    twitter: varchar('twitter', { length: 256 }),
    graduation_year: varchar('graduation_year', { length: 256 }),
    headline: varchar('headline', { length: 256 }),
    username: varchar('username', { length: 256 }),
    company_website: varchar('company_website', { length: 256 }),
    company_logo: varchar('company_logo', { length: 256 }),
    company_description: varchar('company_description', { length: 256 }),
    proof_of_work: jsonb('proof_of_work').array(),
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
        idIndex: uniqueIndex('users_id_index').on(users.id),
        pk: primaryKey(users.id)
    }
});

// export const usersOnClubs = pgTable('user_clubs', {
//     userId: uuid('id').notNull().references(() => users.id),
//     clubId: uuid('id').notNull().references(() => clubs.id),
//     created_at: timestamp('created_at').defaultNow(),
//     updated_at: timestamp('updated_at').defaultNow(),
// });

export const userRelations = relations(users, ({ many }) => ({
    discussions: many(discussions),
    works: many(works),
    usersToApplications: many(applications),
    usersToClub: many(usersOnClub),
    participants: many(participants)
}));

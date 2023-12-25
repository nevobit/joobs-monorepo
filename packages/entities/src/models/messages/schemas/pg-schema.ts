// import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "../../users";

export const messages = pgTable('messages', {
    id: uuid('id').defaultRandom(),
    text: text('text'),
    receiverId: uuid('receiver_id'),
    senderId: uuid('sender_id'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
}, (messages) => {
    return {
        cpk: primaryKey(messages.id),
    }
});

export const messageRelations = relations(messages, ({ one }) => ({
    receiver: one(users, {
        fields: [messages.receiverId],
        references: [users.id]
    }),
    sender: one(users, {
        fields: [messages.senderId],
        references: [users.id]
    })
}))

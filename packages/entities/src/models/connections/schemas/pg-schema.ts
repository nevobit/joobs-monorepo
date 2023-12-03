import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { users } from '../../users';

export const connections = pgTable('connections', {
  senderId: uuid('sender_id').notNull(),
  receiverId: uuid('receiver_id').notNull(),
  status: varchar("status", { length: 256 }), // Puedes ajustar el tipo de dato según tus necesidades
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}, (connections) => ({
  pk: primaryKey(connections.senderId, connections.receiverId),
}));

export const connectionsRelations = relations(connections, ({ one }) => ({
  sender: one(users, {
    fields: [connections.senderId],
    references: [users.id],
  }),
  receiver: one(users, {
    fields: [connections.receiverId],
    references: [users.id],
  }),
}));

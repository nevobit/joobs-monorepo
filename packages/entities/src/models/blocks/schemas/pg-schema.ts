import { relations } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  uuid,
  primaryKey,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "../../users";

export const blocks = pgTable(
  "blocks",
  {
    senderId: uuid("sender_id").notNull(),
    receiverId: uuid("receiver_id").notNull(),
    status: varchar("status", { length: 256 }), // Puedes ajustar el tipo de dato según tus necesidades
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (blocks) => ({
    pk: primaryKey(blocks.senderId, blocks.receiverId),
  })
);

export const blocksRelations = relations(blocks, ({ one }) => ({
  sender: one(users, {
    fields: [blocks.senderId],
    references: [users.id],
  }),
  receiver: one(users, {
    fields: [blocks.receiverId],
    references: [users.id],
  }),
}));

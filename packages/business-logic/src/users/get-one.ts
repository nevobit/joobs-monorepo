import { clientDb } from '@joobs/data-sources';
import { users } from '@joobs/entities';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';

export const getUserById = async (id: string) => {  
  const infoInstance = await clientDb();

  const db = drizzle(infoInstance, { schema: { users } })
 
  
  const result = await db.select().from(users).where(and(eq(users.id, id)));
  const user = result[0];
  return user;
};
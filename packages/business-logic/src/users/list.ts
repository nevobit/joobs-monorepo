import { clientDb } from '@joobs/data-sources';
import { users } from '@joobs/entities';
import { ne } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';

export const getAllUser = async () => {  
  const infoInstance = await clientDb();

  const db = drizzle(infoInstance, { schema: { users } })

  const result = await db.select().from(users).where(ne(users.email, 'test@email.com')).where(ne(users.name, ""));

  return result;
};
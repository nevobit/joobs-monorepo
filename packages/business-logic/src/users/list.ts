import { clientDb } from '@joobs/data-sources';
import { users } from '@joobs/entities';
import { drizzle } from 'drizzle-orm/node-postgres';

export const getAllUser = async () => {  
  const infoInstance = await clientDb();

  const db = drizzle(infoInstance, { schema: { users } })

  const result = await db.select().from(users);

  const activeUser = result.filter(user => user.email !== 'test@email.com' || user.name !== undefined);
  return activeUser;
};
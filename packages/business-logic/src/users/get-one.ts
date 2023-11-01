import { getDbInstance } from '@joobs/data-sources';
import { users } from '@joobs/entities';
import { and, eq } from 'drizzle-orm';

export const getUserById = async (id: string) => {  
    const result = await getDbInstance().select().from(users).where(and(eq(users.id, id)));
  const user = result[0];
  return user;
};
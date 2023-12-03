import { clientDb } from '@joobs/data-sources';
import { applications } from '@joobs/entities';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';

export const getUserOnClubById = async (id: string) => {  
  const infoInstance = await clientDb();

  const db = drizzle(infoInstance, { schema: { applications } })

  const result = await db.select().from(applications).where(and(eq(applications.userId, id)));
  const work = result[0];
  return work;
};
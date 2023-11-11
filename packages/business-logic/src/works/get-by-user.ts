import { clientDb } from '@joobs/data-sources';
import { works } from '@joobs/entities';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';

export const getWorkByUserId = async (id: string) => {  
  const infoInstance = await clientDb();

  const db = drizzle(infoInstance, { schema: { works } })

  const result = await db.select().from(works).where(and(eq(works.userId, id)));
  const work = result;
  return work;
};
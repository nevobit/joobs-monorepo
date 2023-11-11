import { clientDb } from '@joobs/data-sources';
import { works } from '@joobs/entities';
import { and, eq } from 'drizzle-orm';

export const getWorkByUserId = async (id: string) => {  
  const result = await clientDb().select().from(works).where(and(eq(works.userId, id)));
  const work = result;
  return work;
};
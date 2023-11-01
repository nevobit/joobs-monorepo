import { getDbInstance } from '@joobs/data-sources';
import { works } from '@joobs/entities';
import { and, eq } from 'drizzle-orm';

export const getWorkByUserId = async (id: string) => {  
  const result = await getDbInstance().select().from(works).where(and(eq(works.userId, id)));
  const work = result;
  return work;
};
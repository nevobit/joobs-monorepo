import { getDbInstance } from '@joobs/data-sources';
import { works } from '@joobs/entities';
import { and, eq } from 'drizzle-orm';

export const getWorkById = async (id: string) => {  
  const result = await getDbInstance().select().from(works).where(and(eq(works.id, id)));
  const work = result[0];
  return work;
};
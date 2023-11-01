import { getDbInstance } from '@joobs/data-sources';
import { applications } from '@joobs/entities';
import { and, eq } from 'drizzle-orm';

export const getApplicationById = async (id: string) => {  
  const result = await getDbInstance().select().from(applications).where(and(eq(applications.userId, id)));
  const work = result[0];
  return work;
};
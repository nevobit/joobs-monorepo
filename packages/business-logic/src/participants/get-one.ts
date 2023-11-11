import { clientDb } from '@joobs/data-sources';
import { applications } from '@joobs/entities';
import { and, eq } from 'drizzle-orm';

export const getParticipants = async (id: string) => {  
  const result = await clientDb().select().from(applications).where(and(eq(applications.userId, id)));
  const work = result[0];
  return work;
};
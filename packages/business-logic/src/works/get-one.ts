import { works, users, workRelations } from '@joobs/entities';
import { and, eq } from 'drizzle-orm';
import { drizzle } from "drizzle-orm/node-postgres";
import { clientDb } from '@joobs/data-sources'

export const getWorkById = async (id: string) => {  
  const infoInstance = await clientDb();

  // const result = await getDbInstance().select().from(works).where(and(eq(works.id, id)));
  const db = drizzle(infoInstance, { schema: { users, works, workRelations } })

  const result = await db.query.works.findMany({
      where:(and(eq(works.id, id))),
      with: {
          user: true
      }
  })

  const work = result[0];
  return work;
};
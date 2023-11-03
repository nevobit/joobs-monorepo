import { projects, users } from '@joobs/entities';
import { and, eq } from 'drizzle-orm';
import { drizzle } from "drizzle-orm/node-postgres";
import { clientDb } from '@joobs/data-sources'

export const getProjectById = async (id: string) => {  
  const infoInstance = await clientDb();

  // const result = await getDbInstance().select().from(works).where(and(eq(works.id, id)));
  const db = drizzle(infoInstance, { schema: { users, projects } })

  const result = await db.query.projects.findMany({
      where:(and(eq(projects.id, id)))
  })

  const work = result[0];
  return work;
};
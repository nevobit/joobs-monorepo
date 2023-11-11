import { clientDb } from '@joobs/data-sources';
import { users } from '@joobs/entities';

export const getAllUser = async () => {  
  const result = await clientDb().select().from(users);
  return result;
};
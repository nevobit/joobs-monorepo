import { getDbInstance } from '@joobs/data-sources';
import { users } from '@joobs/entities';

export const getAllUser = async () => {  
  const result = await getDbInstance().select().from(users);
  return result;
};
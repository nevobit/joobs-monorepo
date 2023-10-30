import { getDbInstance } from "@joobs/data-sources";
import { User, users } from "@joobs/entities";
import { eq } from "drizzle-orm";
import { sign } from "jsonwebtoken";
const { JWT_SECRET } = process.env;

interface UserToken {
    token: string;
}

export const registerUser = async (data: User): Promise<UserToken | Error> => {
    const result = await getDbInstance().update(users)
        .set(data)
        .where(eq(users.email, data.email))
        .returning();

    const token = sign({uuid: result[0].uuid}, JWT_SECRET!, { expiresIn: '15d' });
    return { token };
}
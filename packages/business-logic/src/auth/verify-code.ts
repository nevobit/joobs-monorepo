import { clientDb } from "@joobs/data-sources";
import { users } from "@joobs/entities";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { sign } from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const verifyCode = async ({ email, code }: { code: number, email: string }) => {
    try {
        const infoInstance = await clientDb();

        const db = drizzle(infoInstance, { schema: { users } })
      
        // Verificar que las variables no sean nulas
        if (!email || !code) {
            throw new Error('Invalid input parameters');
        }

        // Consultar la base de datos para obtener el usuario
        const result = await db.select().from(users).where(and(eq(users.email, email)));

        // Verificar si el usuario existe
        if (!result || result.length === 0) {
            throw new Error('User does not exist');
        }

        // Obtener el primer usuario del resultado
        const user = result[0];

        console.log(user)
        // Verificar el código
        if(Number(user.code) !== Number(code)) {
            throw new Error('Invalid verification code');
        }
            // Actualizar el último inicio de sesión
            user.last_login = new Date().toString();

            // Generar un token JWT con el ID de usuario
            const token = sign({ id: user.id }, JWT_SECRET!, { expiresIn: '15d' });

            return { token };
         
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error(error);
        throw new Error('An error occurred during the verification process');
    }
};

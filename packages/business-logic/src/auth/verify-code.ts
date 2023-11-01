import { getDbInstance } from "@joobs/data-sources";
import { users } from "@joobs/entities";
import { and, eq } from "drizzle-orm";
import { sign } from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const verifyCode = async ({ email, code }: { code: number, email: string }) => {
    try {
        // Verificar que las variables no sean nulas
        if (!email || !code) {
            throw new Error('Invalid input parameters');
        }

        // Consultar la base de datos para obtener el usuario
        const result = await getDbInstance().select().from(users).where(and(eq(users.email, email)));

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

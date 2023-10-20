import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const verifyToken = async (context: any) => {
    const authHeader = context.req.headers.authorization;

    if(!authHeader)
    throw new Error("Unauthorized: Authorization header is missing");

    const token = authHeader.split(' ')[1];

    if(!token) throw new Error('Invalid token');

    const decodedToken = await jwt.verify(token!, JWT_SECRET!);
    return decodedToken;
}
import { clientDb } from "@joobs/data-sources";
import { connections, users } from "@joobs/entities";
import { InferInsertModel, and, eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { messaging } from "firebase-admin";
import { Message } from "firebase-admin/lib/messaging/messaging-api";

export const sendConnection = async (data: InferInsertModel<typeof connections>) => {
    const infoInstance = await clientDb();
    const db = drizzle(infoInstance, { schema: { connections, users } })

    const existingConnection = await db.select().from(connections).where(or(and(eq(connections.senderId, data.senderId), eq(connections.receiverId, data.receiverId)), and(eq(connections.senderId, data.receiverId), eq(connections.receiverId, data.senderId))));
    if (existingConnection.length > 0) {
        return;
    }

    const newConnection = await db.insert(connections).values(data).returning();

    const sender = await db.query.users.findMany({ where: eq(users.id, newConnection[0].senderId!)})
    const receiver = await db.query.users.findMany({ where: eq(users.id, newConnection[0].receiverId!)})

    try{
        // const i = await axios.post("https://testfcm.com/api/notify", info)
        // console.log(i)
        const message: Message = {
          notification: {
            title: "Tienes una solicitud de conexión de " + sender[0].name!,
            body: "Click aquí para ver su perfil",
          },
          token: receiver[0].token!,
        };
        const noti = await messaging()
        .send(message)
        console.log("Notificacion Enviada: "+noti);
    }catch(e){
      console.log("Error al enviar notificacion en OK: "+ e);
    }
    return newConnection;
}


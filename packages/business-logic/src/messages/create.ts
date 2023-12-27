import { clientDb } from "@joobs/data-sources";
import { messages, users } from "@joobs/entities";
import { InferInsertModel, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { messaging } from "firebase-admin";
import { Message } from "firebase-admin/lib/messaging/messaging-api";
// import axios from "axios"

export const createMessage = async (data: InferInsertModel<typeof messages>) => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { messages, users } })
  
    const result = await db.insert(messages).values(data).returning();

    const sender = await db.query.users.findMany({ where: eq(users.id, result[0].senderId!)})
    const receiver = await db.query.users.findMany({ where: eq(users.id, result[0].receiverId!)})


//     const info = {
//         postBody: {
//         notification: {
//             body: result[0].text!,
//             title: user[0].name!
//         },
//         to: user[0].token!,
//     },
//     serverKey: "AAAA5f7stCE:APA91bFxVYWlpvEokAFK6pSvBEeuKZPZ8sBy9N7kvzjwh9r8TVVgkNncjn2UEeOAxOdz0quYchJ_2EbqFArfaq-a9QwuPmbShm9F1R4f2iZqwZ_yVL7N53M8fPuV6DGGkW0j6e7RVVU4",

// }
    try{
        // const i = await axios.post("https://testfcm.com/api/notify", info)
        // console.log(i)
        const message: Message = {
          notification: {
            title: sender[0].name!,
            body: result[0].text!,
          },
          token: receiver[0].token!,
        };
        const noti = await messaging()
        .send(message)
        console.log("Notificacion Enviada: "+noti);
    }catch(e){
      console.log("Error al enviar notificacion en OK: "+ e);
    }

    return result[0];
}


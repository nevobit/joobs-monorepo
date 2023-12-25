import {
    Result,
    Params,
    messages,
    users,
    userRelations,
    messageRelations
  } from "@joobs/entities";
  import { clientDb /*clientDb */ } from "@joobs/data-sources";
  // import { eq } from 'drizzle-orm'
  import { drizzle } from "drizzle-orm/node-postgres";
  import { eq, or } from "drizzle-orm";
  
  interface Props extends Params {
    id: string;
  }
  
  export const getMyConversations = async ({
    page = 1,
    limit = 1000,
    id,
  }: Props): Promise<Result<any>> => {
    const infoInstance = await clientDb();
  
    const db = drizzle(infoInstance, {
      schema: {
        users,
        messages,
        messageRelations,
        userRelations,
      },
    });
  
    const result = await db.query.messages.findMany({
      where: or(
        eq(messages.receiverId, id!),
        eq(messages.senderId, id!)
      ),
      with: {
        sender: true,
        receiver: true
      }
    });

    const conversations: Record<string, any> = {};
    for (const message of result) {
      const participantId = message.senderId === id ? message.receiverId || "" : message.senderId || "";

      let information: any = {}

      if(message.senderId === id){
        information = message.receiver
      }else {
        information = message.sender
      }

      if (!conversations[participantId]) {
        conversations[participantId] = {
          participantId,
          lastMessage: message.text,
          lastMessageTime: message.created_at,
          user: information,
        };
      } else if (message.created_at! > conversations[participantId].lastMessageTime) {
        conversations[participantId].lastMessage = message.text;
        conversations[participantId].lastMessageTime = message.created_at;
      }
    }

    // Convierte el objeto de conversaciones en un array y aplica paginación
    const conversationArray = Object.values(conversations);
    const items = conversationArray;

  
    const pageSize = limit;
    const count = (await result).length;
    const pages = Math.ceil(count / pageSize);
  
    // let items = await result.limit(pageSize);
    // let items = result;
    const hasPreviousPage = page > 1;
    const previousPage = hasPreviousPage ? page - 1 : page;
  
    const hasNextPage = page < pages;
    const nextPage = hasNextPage ? page + 1 : page;
  
    return {
      count,
      items: items,
      pageInfo: {
        page,
        pages,
        hasPreviousPage,
        hasNextPage,
        nextPage,
        previousPage,
      },
    };
  };
  
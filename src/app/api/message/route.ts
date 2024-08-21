import { prisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

type RequestProps = {
  message: string;
  id: string;
  username: string;
};

export async function POST(req: Request) {
  const { message, id, username }: RequestProps = await req.json();

  //id: the 'room' that all users currently subscribed to receiving message
  //"incoming-message": which bind callback that will be ran on the client
  //message: payload used for "incoming-message" client-side bind
  pusherServer.trigger(id, "incoming-message", message);

  const newMessage = await prisma.puzzleChatMessage.create({
    data: {
      message,
      sessionId: id,
      username,
    },
  });

  return new Response(JSON.stringify({ success: true }));
}

"use server";
import { prisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const HandleAddNewMessageSchema = z.object({
  message: z.string(),
  id: z.string(),
  username: z.string(),
});
export const handleAddNewMessage = async (
  props: z.infer<typeof HandleAddNewMessageSchema>,
) => {
  try {
    const { message, id, username } = HandleAddNewMessageSchema.parse(props);
    
    const newMessage = await prisma.puzzleChatMessage.create({
      data: {
        message,
        sessionId: id,
        username,
      },
    });
    pusherServer.trigger(id, "incoming-message", newMessage);
    revalidatePath(`session/${id}`)
    return newMessage;
  } catch (error) {
    console.error("Error adding new message: ", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for adding new message");
    }
    throw new Error("Failed to add message");
  }
};

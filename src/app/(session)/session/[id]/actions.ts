"use server";
import { prisma } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const RevalidateSessionSchema = z.object({
  sessionId: z.string(),
});
export const revalidateSession = async (
  props: z.infer<typeof RevalidateSessionSchema>,
) => {
  const { sessionId } = RevalidateSessionSchema.parse(props);
  revalidatePath(`/session${sessionId}`);
};
const EndSessionSchema = z.object({
  sessionId: z.string(),
});
export const endSession = async (props: z.infer<typeof EndSessionSchema>) => {
  try {
    const { sessionId } = EndSessionSchema.parse(props);
    await prisma.puzzleChatMessage.deleteMany({
      where: {sessionId}
    })
    await prisma.puzzleElementalTrials.delete({
      where: { id: sessionId },
    });
  } catch (error) {
    console.error("Error ending session: ", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for ending session");
    }
    throw new Error("Failed to end session");
  }
};

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
    revalidatePath(`session/${id}`);
    return newMessage;
  } catch (error) {
    console.error("Error adding new message: ", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for adding new message");
    }
    throw new Error("Failed to add message");
  }
};

const HandleSolvePuzzleSchema = z.object({
  id: z.string(),
  gem: z.enum(["firegem", "airgem", "watergem", "earthgem"]),
});

export const handleSolvePuzzle = async (
  props: z.infer<typeof HandleSolvePuzzleSchema>,
) => {
  try {
    const { id, gem } = HandleSolvePuzzleSchema.parse(props);

    await prisma.puzzleElementalTrials.update({
      where: {
        id,
      },
      data: {
        [gem]: true,
      },
    });
    pusherServer.trigger(id, "complete-puzzle", gem);
    revalidatePath(`session/${id}`);
    return gem;
  } catch (error) {
    console.error("Error updating puzzle solved: ", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for updating puzzle");
    }
    throw new Error("Failed to update puzzle");
  }
};

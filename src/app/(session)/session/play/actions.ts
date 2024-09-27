"use server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const HandlePlayTrialsSchema = z.object({
  sessionId: z.string(),
});
export const handlePlayTrials = async (
  props: z.infer<typeof HandlePlayTrialsSchema>,
) => {
  try {
    const { sessionId } = HandlePlayTrialsSchema.parse(props);
    const foundSession = await prisma.puzzleElementalTrials.findFirst({
      where: {
        id: sessionId,
      },
    });
    if (foundSession) {
      return sessionId;
    } else {
      const createdSession = await prisma.puzzleElementalTrials.create({
        data: {
          id: sessionId,
          title: "The Trials of the Elements",
        },
      });
      if (createdSession) {
        
        return sessionId;
      }
    }
  } catch (error) {
    console.error("Error finding Trial Session", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid input for playing Trials Puzzle");
    }
    throw new Error("Failed to start Trials Session");
  }
};

"use server";
import { prisma } from "@/lib/db";
import { MazePuzzle } from "../../../../prisma/generated/zod";

export const saveMazePuzzle = async (maze: MazePuzzle) => {
  const updatedMaze = await prisma.mazePuzzle.update({
    where: { id: maze.id },
    data: {
      ...maze,
    },
  });
  return updatedMaze;
};

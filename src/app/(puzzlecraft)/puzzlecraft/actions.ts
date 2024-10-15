"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const saveMazePuzzle = async ({
  maze,
  isCreated,
}: {
  maze: {
    id: string;
    playerX: number;
    playerY: number;
    rows: number;
    columns: number;
    grid: number[];
    userId: string;
  };
  isCreated?: boolean;
}) => {
  if (!isCreated) {
    const updatedMaze = await prisma.mazePuzzle.upsert({
      where: { id: maze.id },
      update: {
        ...maze,
      },
      create: {
        ...maze,
      },
    });
    revalidatePath(`${process.env.BASE_URL}/puzzlecraft`);
    return updatedMaze;
  } else {
    const { playerX, playerY, rows, columns, grid, userId } = maze;
    const createdMaze = await prisma.mazePuzzle.create({
      data: {
        playerX,
        playerY,
        rows,
        columns,
        grid,
        userId,
      },
    });
    revalidatePath(`${process.env.BASE_URL}/puzzlecraft`);
    return createdMaze;
  }
};

export const deleteMazePuzzle = async ({ id }: { id: string }) => {
  const deletedPuzzle = await prisma.mazePuzzle.delete({
    where: {
      id,
    },
  });
  revalidatePath(`${process.env.BASE_URL}/puzzlecraft`);
  return deletedPuzzle;
};

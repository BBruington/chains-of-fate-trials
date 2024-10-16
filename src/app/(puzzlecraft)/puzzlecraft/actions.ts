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
  try {
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
  } catch (error) {
    console.error(error);
    throw new Error("Failed to save the maze puzzle");
  }
};

export const deleteMazePuzzle = async ({ id }: { id: string }) => {
  try {
    const deletedPuzzle = await prisma.mazePuzzle.delete({
      where: {
        id,
      },
    });
    revalidatePath(`${process.env.BASE_URL}/puzzlecraft`);
    return deletedPuzzle;
  } catch (error) {
    console.error(error)
    throw new Error("Something went wrong when trying to delete the maze puzzle")
  }
};

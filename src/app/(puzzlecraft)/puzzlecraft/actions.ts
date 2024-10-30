"use server";
import { prisma } from "@/lib/db";
import { Enemy } from "@prisma/client";
import { revalidatePath } from "next/cache";

const upsertEnemiesOnMaze = async ({
  allEnemies,
  puzzleId,
}: {
  allEnemies: Enemy[];
  puzzleId: string;
}) => {
  try {
    prisma.$transaction([
      prisma.enemy.deleteMany({
        where: { puzzleId },
      }),
      prisma.enemy.createMany({
        data: allEnemies,
      }),
    ]);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update enemies for the puzzle");
  }
};

export const saveMazePuzzle = async ({
  maze,
  isCreated,
  allEnemies,
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
  allEnemies?: Enemy[];
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
      if (allEnemies !== undefined) await upsertEnemiesOnMaze({ allEnemies, puzzleId: updatedMaze.id });
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
      if (allEnemies !== undefined) await upsertEnemiesOnMaze({ allEnemies, puzzleId: createdMaze.id });
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
      include: { enemies: true },
    });
    revalidatePath(`${process.env.BASE_URL}/puzzlecraft`);
    return deletedPuzzle;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Something went wrong when trying to delete the maze puzzle",
    );
  }
};

"use server";
import { prisma } from "../utils/context";

export const getSolutionOrder = async () => {
  try {
    const solutionOrder = await prisma.solutionOrder.findUnique({
      where: {
        id: "1",
      },
    });

    console.log(solutionOrder);

    return solutionOrder;
  } catch (error) {
    console.error("Failed to get solution order", error);
  }
};

export const randomizeSolutionOrder = async () => {
  const currentOrder = await getSolutionOrder();
  console.log("Current Order:", currentOrder);

  const shuffledOrder = currentOrder?.order.sort(() => Math.random() - 0.5);
  console.log("Shuffled Order:", shuffledOrder);

  try {
    const updatedSolutionOrder = await prisma.solutionOrder.update({
      where: { id: "1" },
      data: { order: shuffledOrder },
    });
    return updatedSolutionOrder;
  } catch (error) {
    console.error("Failed to randomize solution order", error);
  }
};

export const updatePlayerCursorLocation = async () => {};

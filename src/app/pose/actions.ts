"use server";
import { z } from "zod";
import { CoordinatesSelectSchema } from "../../../prisma/generated/zod";
import { prisma } from "../utils/context";

const ChangeHeadCoordinatesSchema = z.object({
  coordinates: CoordinatesSelectSchema.optional(),
  head: z.object({
    x: z.number(),
    y: z.number(),
  }),
});

export const changeHeadCoordiantes = async (props) => {
  try {
    const { head } = ChangeHeadCoordinatesSchema.parse(props);
    console.log(head);

    const headCoordinatesChange = await prisma.coordinates.update({
      where: {
        id: "1",
      },
      data: {
        head: {
          x: head.x,
          y: head.y,
        },
      },
    });

    return headCoordinatesChange;
  } catch (error) {
    console.error("Failed to change Head Coordinates", error);
  }
};

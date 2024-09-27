import { cache } from "react";
import { prisma } from "../utils/context";
import SilentPose from "./_components/silent-pose";
import { PageProvider } from "./page-context";

export const getUser = cache(async () => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: "1",
      },
    });

    return {
      user,
    };
  } catch (error) {
    console.error("Error getting user: ", error);
    throw new Error("Failed to get user");
  }
});

export const getCoordinates = cache(async () => {
  try {
    const coordinates = await prisma.coordinates.findUnique({
      where: {
        id: "1",
      },
    });

    return {
      coordinates,
    };
  } catch (error) {
    console.error("Error getting coordinates: ", error);
    throw new Error("Failed to get coordinates");
  }
});

export default async function Page() {
  return (
    <PageProvider>
      <SilentPose />
    </PageProvider>
  );
}

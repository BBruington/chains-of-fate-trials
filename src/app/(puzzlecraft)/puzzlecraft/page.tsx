import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import PuzzleCraft from "./_components/puzzle-craft";

export default async function Page() {
  const user = await currentUser();
  if (!user) return <div>failed to fetch user</div>;
  const userPuzzles = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      clerkId: true,
      MazePuzzle: { orderBy: { createdAt: "asc" }, include: { enemies: true } },
      MazeSessions: { include: { Mazes: { include: { enemies: true } } } },
    },
  });
  if (!userPuzzles) return <div>failed to get puzzle</div>;
  userPuzzles.MazeSessions;
  return <PuzzleCraft userPuzzles={userPuzzles} />;
}

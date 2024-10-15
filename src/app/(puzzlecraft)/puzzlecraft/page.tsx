import CraftMaze from "./_components/craft-maze-page";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export default async function Page() {
  const user = await currentUser();
  if (!user) return <div>failed to fetch user</div>;
  const userPuzzles = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      MazePuzzle: true
    }
  });
  if(!userPuzzles) return <div>failed to get puzzle</div>
  return <CraftMaze  userPuzzles={userPuzzles}/>;
}

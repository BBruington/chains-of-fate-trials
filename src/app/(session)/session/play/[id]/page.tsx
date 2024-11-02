import { prisma } from "@/lib/db";
import MazeSession from "../_components/maze-session";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps)  {
  const session = await prisma.mazeSession.findUnique({
    where: { id: params.id },
    include: { Mazes: { include: { enemies: true } } },
  });
  if (!session) return <div>failed to fetch mazes</div>;
  return (
    <div>
      <MazeSession session={session}/>
    </div>
  );
};

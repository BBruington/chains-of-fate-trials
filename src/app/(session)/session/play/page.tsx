import { prisma } from "@/lib/db";
import PlayTrialsComponent from "./_components/play-trials-component";
import PlaySessionCard from "./_components/play-session-card";

export default async function Page() {
  const allUserMazeSessions = await prisma.mazeSession.findMany();

  return (
    <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
      <PlayTrialsComponent />
      {allUserMazeSessions.map((session) => (
        <PlaySessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}

import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SessionPage from "./_components/session-page";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const user = await currentUser();
  if (!user) return <div>failed to fetch user</div>;
  const { id } = params;
  const puzzleSession = await prisma.puzzleSession.findUnique({
    where: { id },
  });

  if (puzzleSession === null) redirect("/404");

  const existingMessages = await prisma.puzzleChatMessage.findMany({
    where: {
      sessionId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex h-[calc(100vh-48px)]">
      <SessionPage
        sessionId={id}
        username={user.username ? user.username : ""}
        chatMessages={existingMessages}
      />
    </div>
  );
};

export default page;

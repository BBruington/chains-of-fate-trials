import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import Messages from "./_components/messages";
import { redirect } from "next/navigation";

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

  const chatMessages = existingMessages.map((message) => message.message);

  return (
    <div className="flex h-[calc(100vh-48px)] justify-between">
      <div></div>
      <Messages
        id={id}
        chatMessages={existingMessages}
        username={user.username ? user.username : ""}
      />
    </div>
  );
};

export default page;

import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const DEFAULT_IMAGE_URL =
  "https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg";

export default async function page() {
  const user = await currentUser();
  if (!user)
    return <div>Failed to fetch user. Please try logging in again.</div>;

  const userGameSessions = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: {
      puzzleSessions: true,
    },
  });

  if (!userGameSessions || userGameSessions.puzzleSessions.length === 0) {
    return (
      <div className="p-6 text-center">
        No game sessions found. Start a new game to see it here!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
      {userGameSessions?.puzzleSessions.map((session) => (
        <Link
          className={cn(
            "group cursor-pointer overflow-hidden rounded-lg border border-primary-foreground",
            "transition-all duration-200 ease-in-out hover:shadow-lg",
          )}
          key={session.id}
          href={`/session/${session.id}`}
        >
          <div className="relative h-60 w-full">
            <Image
              fill={true}
              style={{ objectFit: "cover" }}
              className="transition-transform duration-200 ease-in-out group-hover:scale-105"
              src={DEFAULT_IMAGE_URL}
              alt="session main image"
            />
          </div>
          <div className="flex justify-between bg-accent-foreground p-5">
            <div>
              <h3 className="truncate text-lg font-bold text-black">
                {session.title}
              </h3>
              <p className="flex text-xs text-black">
                By: John Smith
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

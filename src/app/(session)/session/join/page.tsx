import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function page() {
  const user = await currentUser();
  if (!user) return <div>failed to fetch user</div>;

  const myGameSessions = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: {
      puzzleSessions: true,
    },
  });

  return (
    <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
      {myGameSessions?.puzzleSessions.map((session) => (
        <Link className="" key={session.id} href={`/session/${session.id}`}>
          <div className="group cursor-pointer overflow-hidden rounded-lg border border-primary-foreground">
            <img
              className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
              src={`${"https://scgovlibrary.librarymarket.com/sites/default/files/2020-12/dndmobile-br-1559158957902.jpg"}`}
              alt="session main image"
            />
            <div className="flex justify-between bg-accent-foreground p-5">
              <div>
                <p className="text-lg font-bold text-black">
                  {session.title.substring(0, 30)}
                </p>
                <div className="flex space-x-5">
                  <p className="flex text-xs text-black">
                    <>By: John Smith</>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

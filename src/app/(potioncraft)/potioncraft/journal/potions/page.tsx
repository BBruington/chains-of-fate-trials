import { prisma } from "@/app/utils/context";
import { currentUser } from "@clerk/nextjs/server";
import DisplayPotion from "./_components/display-potion";
import PotionListItem from "./_components/potion-list-item";

export default async function PotionJournal() {
  const getUser = await currentUser();
  if (!getUser) return <div>Not signed in</div>;

  const user = await prisma.user.findUnique({
    where: { clerkId: getUser.id },
    include: { Potions: true },
  });

  const userPotions = user?.Potions;
  return (
    <div className="flex w-screen justify-between">
      <div />
      <div className="mt-16 flex w-full justify-center">
        <DisplayPotion />
      </div>
      <div className="flex h-full w-96 flex-col items-center space-y-2 overflow-y-auto border border-r-0 border-primary/40 bg-secondary p-3">
        <h2>My Potions</h2>
        {userPotions?.map((potion) => (
          <PotionListItem key={potion.id} potion={potion} />
        ))}
      </div>
    </div>
  );
}

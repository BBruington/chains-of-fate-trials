import { prisma } from "@/app/utils/context";
import { currentUser } from "@clerk/nextjs/server";
import DisplayPotion from "./_components/display-potion";
import PotionListItem from "./_components/potion-list-item";
export default async function Journal() {
  const curUser = await currentUser();
  if (!curUser) return <div>Not signed in</div>;

  const user = await prisma.user.findUnique({
    where: { clerkId: curUser.id },
    include: { Potions: true },
  });

  const userPotions = user?.Potions;
  return (
    <div className="flex w-screen justify-between">
      <div></div>
      <div className="flex w-full justify-center items-center">
          <DisplayPotion />
      </div>
        <div className="flex h-full w-96 flex-col items-center space-y-3 overflow-y-auto bg-secondary p-3">
          <h2>My Potions</h2>
          {userPotions?.map((potion) => (
            <PotionListItem key={potion.id} potion={potion} />
          ))}
        </div>
    </div>
  );
}

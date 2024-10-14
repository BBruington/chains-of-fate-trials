import { currentUser } from "@clerk/nextjs/server";
import DisplayPotion from "./_components/display-potion";
import PotionListItem from "./_components/potion-list-item";
import { getUser } from "../../page";
import { cn } from "@/lib/utils";
import { Cinzel } from "next/font/google";
const fontHeader = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default async function PotionJournal() {
  const clerkUser = await currentUser();
  if (!clerkUser) return <div>Not signed in</div>;

  const { potions, ingredients } = await getUser(clerkUser.id);
  if (!potions) return <div>failed to fetch user potions</div>;

  return (
    <div className="flex w-screen justify-between">
      <div />
      <div className="mt-16 flex w-full justify-center">
        <DisplayPotion />
      </div>
      <div className="flex h-full w-96 flex-col items-center space-y-2 overflow-y-auto border border-r-0 border-primary/40 bg-secondary p-3">
        <h2
          className={cn(
            fontHeader.className,
            "w-full border-b text-center text-[28px]",
          )}
        >
          My Potions
        </h2>
        {potions?.map((potion) => (
          <PotionListItem key={potion.id} potion={potion} />
        ))}
      </div>
    </div>
  );
}

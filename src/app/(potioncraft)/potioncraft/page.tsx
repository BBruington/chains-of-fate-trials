import { currentUser } from "@clerk/nextjs/server";
import PotionCraftComponent from "./_components/potion-craft";
import { prisma } from "@/app/utils/context";

export default async function PotionCraftPage() {
  const clerkUser = await currentUser();

  if (clerkUser === null) return <div>Not signed in</div>;

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id
    },
    select: {
      Ingredients: true,
      Potions: true,
      Formulas: true
    }
  })
  if(user === null) return <div>Could not find user</div>

  return (
    <PotionCraftComponent
      ingredients={user.Ingredients}
      userId={clerkUser.id}
      potions={user.Potions}
      formulas={user.Formulas}
    />
  );
}

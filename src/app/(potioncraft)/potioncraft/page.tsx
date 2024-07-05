import PotionCraftComponent from "./_components/potion-craft";
import { prisma } from "@/app/utils/context";
import { currentUser } from "@clerk/nextjs/server";

export default async function PotionCraftPage() {
  const user = await currentUser();

  if (!user) return <div>Not signed in</div>;

  const ingredients = await prisma.ingredient.findMany({
    where: {
      userId: user.id,
    },
  });

  const potions = await prisma.potion.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <PotionCraftComponent
      ingredients={ingredients}
      userId={user.id}
      potions={potions}
    />
  );
}

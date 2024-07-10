import { currentUser } from "@clerk/nextjs/server";
import PotionCraftComponent from "./_components/potion-craft";
import { prisma } from "@/app/utils/context";

export default async function PotionCraftPage() {
  const user = await currentUser();

  if (user === null) return <div>Not signed in</div>;

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
  const formulas = await prisma.formula.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <PotionCraftComponent
      ingredients={ingredients}
      userId={user.id}
      potions={potions}
      formulas={formulas}
    />
  );
}

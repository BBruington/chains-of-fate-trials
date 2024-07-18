import { currentUser } from "@clerk/nextjs/server";
import PotionCraftComponent from "./_components/potion-craft";
import { prisma } from "@/app/utils/context";
import { cache } from "react";

export const getUser = cache(async (userId: string) => {
  try {
    console.log("here")
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        Ingredients: true,
        Potions: true,
        Formulas: true,
      },
    });
  
    return {
      user,
      ingredients: user?.Ingredients,
      potions: user?.Potions,
      formulas: user?.Formulas,
    };
    } catch (error) {
    console.error("Error getting user: ", error);
    throw new Error("Failed to get user");
  }
});

export default async function PotionCraftPage() {
  const clerkUser = await currentUser();

  if (clerkUser === null) return <div>Not signed in</div>;

  const { ingredients, potions, formulas } = await getUser(clerkUser.id);

  if (!ingredients || !potions || !formulas)
    return <div>Failed to get user Data</div>;

  return (
    <PotionCraftComponent
      ingredients={ingredients}
      userId={clerkUser.id}
      potions={potions}
      formulas={formulas}
    />
  );
}

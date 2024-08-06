import { currentUser } from "@clerk/nextjs/server";
import PotionCraftComponent from "./_components/potion-craft";
import { prisma } from "@/app/utils/context";
import { cache } from "react";
import { GetUserPromise } from "./_hooks/types";

export const getUser = cache(
  async (userId: string): Promise<GetUserPromise> => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          clerkId: userId,
        },
        include: {
          Ingredients: { orderBy: { name: "asc" } },
          Potions: { orderBy: { name: "asc" } },
          Formulas: { orderBy: { name: "asc" } },
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
  },
);

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

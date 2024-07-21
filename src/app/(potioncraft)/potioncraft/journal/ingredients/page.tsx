import { prisma } from "@/app/utils/context";
import { currentUser } from "@clerk/nextjs/server";
import IngredientListItem from "./_components/ingredient-list-item";
import DisplayIngredient from "./_components/display-ingredient";

export default async function IngredientJournal() {
  const curUser = await currentUser();
  if (!curUser) return <div>Not signed in</div>;

  const user = await prisma.user.findUnique({
    where: { clerkId: curUser.id },
    include: { Ingredients: true },
  });

  const userIngredients = user?.Ingredients;
  return (
    <div className="flex w-screen justify-between">
      <div />
      <div className="mt-16 flex w-full justify-center">
        <DisplayIngredient />
      </div>
      <div className="flex h-full w-96 flex-col items-center space-y-3 overflow-y-auto border border-r-0 border-primary/40 bg-secondary p-3">
        <h2>My Ingredients</h2>
        {userIngredients?.map((ingredient) => (
          <IngredientListItem key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
}

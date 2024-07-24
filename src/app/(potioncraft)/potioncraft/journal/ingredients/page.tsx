import { prisma } from "@/app/utils/context";
import { currentUser } from "@clerk/nextjs/server";
import IngredientListItem from "./_components/ingredient-list-item";
import DisplayIngredient from "./_components/display-ingredient";
import IngredientShop from "./_components/ingredient-shop";

export default async function IngredientJournal() {
  const curUser = await currentUser();
  if (!curUser) return <div>Not signed in</div>;

  const user = await prisma.user.findUnique({
    where: { clerkId: curUser.id },
    include: { Ingredients: true },
  });

  const userIngredients = user?.Ingredients;

  if(!user) return <div>Failed to fetch user from db</div>
  
  return (
    <div className="flex w-screen justify-between">
      <div />
      <div className="mt-16 flex w-full justify-center">
        {/* <DisplayIngredient /> */}
        <IngredientShop userId={user?.clerkId}/>
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

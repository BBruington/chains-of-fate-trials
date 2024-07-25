import { currentUser } from "@clerk/nextjs/server";
import IngredientListItem from "./_components/ingredient-list-item";
import DisplayIngredient from "./_components/display-ingredient";
import IngredientShop from "./_components/ingredient-shop";
import { getUser } from "../../page";

export default async function IngredientJournal() {
  const clerkUser = await currentUser();
  if (!clerkUser) return <div>Not signed in</div>;

  const { ingredients } = await getUser(clerkUser.id);

  if (!ingredients) return <div>Failed to fetch user from db</div>;

  return (
    <div className="flex w-screen justify-between">
      <div />
      <div className="mt-16 flex w-full justify-center">
        {/* <DisplayIngredient /> */}
        <IngredientShop userId={clerkUser.id} />
      </div>
      <div className="flex h-full w-96 flex-col items-center space-y-3 overflow-y-auto border border-r-0 border-primary/40 bg-secondary p-3">
        <h2>My Ingredients</h2>
        {ingredients?.map((ingredient) => (
          <IngredientListItem key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
}

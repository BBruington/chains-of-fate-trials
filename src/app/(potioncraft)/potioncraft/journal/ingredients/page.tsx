import { currentUser } from "@clerk/nextjs/server";
import IngredientsPage from "./_components/ingredients-page";
import { getUser } from "../../page";

export default async function IngredientJournal() {
  const clerkUser = await currentUser();
  if (!clerkUser) return <div>Not signed in</div>;

  const { ingredients } = await getUser(clerkUser.id);

  if (!ingredients) return <div>Failed to fetch user from db</div>;

  return (
    <div className="flex w-screen justify-between">
      <div />
      <IngredientsPage userId={clerkUser.id} ingredients={ingredients} />
    </div>
  );
}

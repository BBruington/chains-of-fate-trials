import Spinner from "@/components/spinner";
import { playerIngredients } from "../../_components/testData";
import { Button } from "@/components/ui/button";

export default function Loading() {
  playerIngredients.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return (
    <div className="flex w-screen justify-between">
      <div />
      <div className="mt-16 flex w-full justify-center">
        <div className="ml-1 flex w-full flex-col">
          <div className="mb-1 flex w-full items-center border-b-2 border-red-800">
            <span className="w-32 text-xl">Name</span>
            <span className="mx-2 w-28 text-xl">Type</span>
            <span className="w-28 text-xl">Rarity</span>
            <span className="ml-3 w-24 text-xl">Buy</span>
          </div>
          {playerIngredients.map((ingredient) => (
            <div className="flex min-h-8 w-full items-center border-b text-sm">
              <span className="w-32">{ingredient.name}</span>
              <span className="mx-2 w-28">{ingredient.type}</span>
              <span className="w-28">{ingredient.rarity}</span>
              <div className="w-24">
                <Button disabled={true} className="ml-3 h-6">
                  Add
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-full w-96 flex-col items-center space-y-3 overflow-y-auto border border-r-0 border-primary/40 bg-secondary p-3">
        <h2>My Ingredients</h2>
        <Spinner />
      </div>
    </div>
  );
}

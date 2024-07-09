import Draggable from "@/components/dndkit/draggable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IngredientListProps, IngredientItemProps } from "../_types";
import { EMPTY_INGREDIENT } from "@/constants";

export default function IngredientList({
  ingredients,
  handleFilterIngredients,
  handleIncrementIngredient,
}: IngredientListProps) {
  return (
    <>
      <h2 className="py-2 text-2xl">Ingredients</h2>
      <Input
        className="m-2 mr-5"
        onChange={(event) => handleFilterIngredients({ event })}
        aria-label="Filter ingredients"
      />
      <div className="flex w-full flex-col items-center overflow-y-auto">
        {ingredients.length === 0 ? (
          <Draggable id={"empty"} item={EMPTY_INGREDIENT} disabled={true} />
        ) : (
          ingredients.map((item) => (
            <IngredientItem
              key={item.id}
              item={item}
              onIncrement={handleIncrementIngredient}
            />
          ))
        )}
      </div>
    </>
  );
}

function IngredientItem({ item, onIncrement }: IngredientItemProps) {
  return (
    <div className="flex items-center">
      <Draggable showQuantity={true} id={item.id} item={item} />
      <Button
        onClick={() => onIncrement({ ingredient: item })}
        className="ml-1 h-6 w-10 text-xs"
        aria-label={`Add ${item.name}`}
      >
        Add
      </Button>
    </div>
  );
}

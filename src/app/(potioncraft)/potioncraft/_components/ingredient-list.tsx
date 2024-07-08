import Draggable from "@/components/dndkit/draggable";
import {
  Ingredient,
  MagicType,
  PrimaryAttribute,
  Rarity,
} from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HandleFilterIngredientsProps } from "../_types/types";
import { IngredientSchema } from "@/types";
import { z } from "zod";

interface IngredientListProps {
  ingredients: Ingredient[];
  handleFilterIngredients: ({
    event,
    ingredients,
  }: HandleFilterIngredientsProps) => void;
  handleIncrementIngredient: ({
    ingredient,
  }: {
    ingredient: z.infer<typeof IngredientSchema>;
  }) => Promise<void>;
}

export default function IngredientList({
  ingredients,
  handleFilterIngredients,
  handleIncrementIngredient,
}: IngredientListProps) {
  const empty = {
    id: "empty",
    name: "Empty",
    type: MagicType["EMPTY"],
    rarity: Rarity["EMPTY"],
    primaryAttribute: PrimaryAttribute["EMPTY"],
    description: "It's empty",
    userId: "empty",
    quantity: 0,
    abjuration: 0,
    conjuration: 0,
    divination: 0,
    enchantment: 0,
    evocation: 0,
    illusion: 0,
    necromancy: 0,
    transmutation: 0,
  };

  return (
    <>
      <div className="py-2 text-2xl">Ingredients</div>
      <Input
        className="m-2 mr-5"
        onChange={(event) => handleFilterIngredients({ event })}
      />
      <div className="flex w-full flex-col items-center overflow-y-auto">
        {ingredients.length === 0 ? (
          <Draggable id={69} item={empty} disabled={true} />
        ) : (
          ingredients.map((item) => (
            <div key={item.id} className="flex items-center">
              <Draggable
                showQuantity={true}
                id={item.id}
                item={item}
              ></Draggable>{" "}
              <Button
                onClick={() => handleIncrementIngredient({ ingredient: item })}
                className="ml-1 h-6 w-10 text-xs"
              >
                Add
              </Button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

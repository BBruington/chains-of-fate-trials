import Draggable from "@/components/dndkit/draggable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  IngredientListProps,
  IngredientItemProps,
  RarityStyleProps,
  IngredientIconProps,
} from "../_types";
import { EMPTY_INGREDIENT } from "@/constants";
import { cn } from "@/lib/utils";
import skull from "@/../public/icons/skull.svg";
import wizardHat from "@/../public/icons/wizard-hat.svg";
import scroll from "@/../public/icons/scroll.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function IngredientList({
  ingredients,
  handleFilterIngredients,
  handleOrderFilteredIngredients,
  handleChangeIngredientQuantity,
}: IngredientListProps) {
  return (
    <>
      <h2 className="py-2 text-2xl">Ingredients</h2>
      <Input
        className="m-2"
        onChange={(event) => handleFilterIngredients({ event })}
        aria-label="Filter ingredients"
        placeholder="Search"
      />
      <Select onValueChange={(e) => handleOrderFilteredIngredients(e)}>
        <SelectTrigger className="mb-4 w-[180px]">
          <SelectValue placeholder="All Ingredients" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Order By</SelectLabel>
            <SelectItem value="alphabet">Alphabetical</SelectItem>
            <SelectItem value="rarity">Rarity</SelectItem>
            <SelectItem value="type">Type</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex w-full flex-col space-y-1 items-center">
        {ingredients.length === 0 ? (
          <Draggable id={"empty"} item={EMPTY_INGREDIENT} disabled={true} />
        ) : (
          ingredients.map((ingredient) => (
            <IngredientItem
              key={ingredient.id}
              ingredient={ingredient}
              onQuantityChange={handleChangeIngredientQuantity}
            />
          ))
        )}
      </div>
    </>
  );
}

function IngredientItem({ ingredient, onQuantityChange }: IngredientItemProps) {
  const rarityStyles: RarityStyleProps = {
    COMMON: "bg-slate-600",
    UNCOMMON: "bg-green-900",
    RARE: "bg-blue-900",
    VERYRARE: "bg-purple-900",
    LEGENDARY: "bg-orange-800",
  };

  const ingredientIcon: IngredientIconProps = {
    ARCANE: wizardHat,
    DIVINE: wizardHat,
    OCCULT: skull,
    PRIMAL: scroll,
  };

  return (
    <div
      className={cn(
        "flex items-center rounded-md border-b px-2",
        rarityStyles[ingredient.rarity as keyof RarityStyleProps],
      )}
    >
      <Image
        className="w-4"
        src={ingredientIcon[ingredient.type as keyof IngredientIconProps]}
        alt="Ingredient Type Icon"
      />
      <Draggable
        showQuantity={true}
        id={ingredient.id}
        item={ingredient}
        className={`text-white ${rarityStyles[ingredient.rarity as keyof RarityStyleProps]}`}
      />
      <Button
        onClick={() => onQuantityChange({ ingredient, quantity: -1 })}
        className="h-5 w-8 rounded-lg border border-black bg-white text-xs text-black hover:primary-60"
        aria-label={`Decrease ${ingredient.name}`}
      >
        -
      </Button>
      <Button
        onClick={() => onQuantityChange({ ingredient, quantity: 1 })}
        className="ml-1 h-5 w-8 border border-black bg-white text-xs text-black hover:primary-60"
        aria-label={`Add ${ingredient.name}`}
      >
        +
      </Button>
    </div>
  );
}

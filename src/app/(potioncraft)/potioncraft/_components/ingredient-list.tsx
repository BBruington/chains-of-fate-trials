import Draggable from "@/components/dndkit/draggable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IngredientListProps, IngredientItemProps } from "../_types";
import { EMPTY_INGREDIENT } from "@/constants";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function IngredientList({
  ingredients,
  handleFilterIngredients,
  handleOrderFilteredIngredients,
  handleIncrementIngredient,
}: IngredientListProps) {
  return (
    <>
      <h2 className="py-2 text-2xl">Ingredients</h2>
      <Input
        className="m-2 mr-5"
        onChange={(event) => handleFilterIngredients({ event })}
        aria-label="Filter ingredients"
        placeholder="Search"
      />
      <Select onValueChange={(e) => handleOrderFilteredIngredients(e)}>
        <SelectTrigger className="mb-2 w-[180px]">
          <SelectValue placeholder="All Ingredients" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Order By</SelectLabel>
            <SelectItem value="alphabet">All Ingredients</SelectItem>
            <SelectItem value="rarity">Ingredient Rarity</SelectItem>
            <SelectItem value="type">Ingredient Type</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
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
  const rarityStyles = {
    COMMON: "bg-slate-600",
    UNCOMMON: "bg-green-900",
    RARE: "bg-blue-900",
  };
  return (
    <div
      className={cn(
        "flex items-center rounded-sm border-b px-2",
        rarityStyles[item.rarity],
      )}
    >
      <Draggable
        showQuantity={true}
        id={item.id}
        item={item}
        className={rarityStyles[item.rarity]}
      />
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

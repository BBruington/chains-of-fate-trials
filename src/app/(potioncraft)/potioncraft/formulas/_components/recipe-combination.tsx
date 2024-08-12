"use clinet";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Formula } from "@prisma/client";

type RecipeCombinationProps = {
  formula: Formula;
  handleSelectFormula: (formula: Formula) => void;
  className?: string
};

export default function RecipeCombination({
  formula,
  className,
  handleSelectFormula,
}: RecipeCombinationProps) {
  const allIngredients: string[] = formula.ingredients;

  type FilteredIngredientsProps = {
    name: string;
    quantity: number;
  };

  const filterDuplicates = (
    ingredients: string[],
  ): FilteredIngredientsProps[] => {
    let filteredIngredients: FilteredIngredientsProps[] = [];
    for (let ingredient of ingredients) {
      if (filteredIngredients.length === 0) {
        filteredIngredients.push({
          name: ingredient,
          quantity: 1,
        });
      } else {
        const existingIng = filteredIngredients.findIndex(
          (ing) => ingredient === ing.name,
        );
        if (existingIng !== -1) {
          filteredIngredients.splice(existingIng, 1, {
            name: ingredient,
            quantity: filteredIngredients[existingIng].quantity + 1,
          });
        } else {
          filteredIngredients.push({
            name: ingredient,
            quantity: 1,
          });
        }
      }
    }
    return filteredIngredients;
  };
  const filteredIng = filterDuplicates(allIngredients);
  return (
    <button
      className={cn(
        "flex w-full flex-col items-center rounded-md", className
      )}
      onClick={() => handleSelectFormula(formula)}
    >
      <ul className="list-disc py-2 px-5">
        {filteredIng.map(
          (ingredient: FilteredIngredientsProps, index: number) => (
            <li
              key={index}
              className={`${ingredient.name === "" && "hidden h-0"} text-left`}
            >
              {ingredient.quantity} {ingredient.name}
            </li>
          ),
        )}
      </ul>
    </button>
  );
}

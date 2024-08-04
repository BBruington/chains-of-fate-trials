"use client";
import { Button } from "@/components/ui/button";
import type { Formula } from "@prisma/client";
import { useAtom } from "jotai";
import { displayFormaula } from "../jotaiAtoms";

interface FormulaProps {
  formula: Formula;
}

export default function FormulaListItem({ formula }: FormulaProps) {
  const [selectedFormula, setSelectedFormula] =
    useAtom<Formula>(displayFormaula);
  const handleSelectFormula = () => {
    setSelectedFormula(formula);
  };

  const allIngredients: string[] = [
    formula.ingredient1 !== null ? formula.ingredient1 : "",
    formula.ingredient2 !== null ? formula.ingredient2 : "",
    formula.ingredient3 !== null ? formula.ingredient3 : "",
    formula.ingredient4 !== null ? formula.ingredient4 : "",
  ];

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
    <Button
      aria-label={`select formula button`}
      onClick={handleSelectFormula}
      className="flex h-fit w-72 flex-col items-center rounded-lg border border-secondary bg-secondary-foreground/70 text-secondary hover:cursor-pointer hover:bg-secondary-foreground/60"
    >
      <h1 className="w-full border-b border-secondary text-center text-2xl">
        {formula.name}
      </h1>
      <h2>Effect: {formula.description}</h2>

      {formula.ingredient1 === null ? (
        <></>
      ) : (
        <>
          <h2 className="border-b border-secondary text-lg">Ingredients</h2>
          <ul className="list-disc">
            {filteredIng.map(
              (ingredient: FilteredIngredientsProps, index: number) => (
                <li
                  key={index}
                  className={`${ingredient.name === "" && "hidden h-0"}`}
                >
                  {ingredient.quantity} {ingredient.name}
                </li>
              ),
            )}
          </ul>
        </>
      )}
    </Button>
  );
}

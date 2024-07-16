"use client"
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

  return (
    <Button
      onClick={handleSelectFormula}
      className="flex h-fit w-72 flex-col items-center rounded-sm border border-secondary bg-secondary-foreground/70 text-secondary hover:cursor-pointer hover:bg-secondary-foreground/60"
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
          <ul>
            {formula.ingredient1 && <li>1. {formula.ingredient1}</li>}
            {formula.ingredient2 && <li>2. {formula.ingredient2}</li>}
            {formula.ingredient3 && <li>3. {formula.ingredient3}</li>}
            {formula.ingredient4 && <li>4. {formula.ingredient4}</li>}
          </ul>
        </>
      )}
    </Button>
  );
}

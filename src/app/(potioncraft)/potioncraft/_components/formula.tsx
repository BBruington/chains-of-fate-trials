import type { Formula } from "@prisma/client";

interface FormulaProps {
  formula: Formula;
}

export default function UserFormula({ formula }: FormulaProps) {
  return (
    <div className="flex w-72 flex-col items-center bg-secondary-foreground/70 text-secondary rounded-sm">
      <h1 className="w-full border-b border-secondary text-center text-2xl">
        {formula.name}
      </h1>
      <h2>Effect: {formula.description}</h2>

      <h2 className="border-b border-secondary text-lg">Ingredients</h2>
      <ul>
        {formula.ingredient1 && <li className="">1. {formula.ingredient1}</li>}
        {formula.ingredient2 && <li>2. {formula.ingredient2}</li>}
        {formula.ingredient3 && <li>3. {formula.ingredient3}</li>}
        {formula.ingredient4 && <li>4. {formula.ingredient4}</li>}
      </ul>
    </div>
  );
}

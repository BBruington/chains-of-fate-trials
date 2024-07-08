import type { Formula } from "@prisma/client";

interface FormulaProps {
  formula: Formula;
}

export default function UserFormula({ formula }: FormulaProps) {
  return (
    <div className="flex flex-col items-center bg-secondary-foreground/70 text-secondary">
      <h1 className="text-2xl">{formula.name}</h1>
      <h2>{formula.description}</h2>
      <ul>
        {formula.ingredient1 && (
          <li className="">{formula.ingredient1}</li>
        )}
        {formula.ingredient2 && (
          <li>{formula.ingredient2}</li>
        )}
        {formula.ingredient3 && (
          <li>{formula.ingredient3}</li>
        )}
        {formula.ingredient4 && (
          <li>{formula.ingredient4}</li>
        )}
      </ul>
    </div>
  );
}

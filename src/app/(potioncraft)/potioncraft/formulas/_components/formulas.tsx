"use client";

import { Formula, User } from "@prisma/client";
import UserFormula from "./formula";
import DisplayFormula from "./displayFormula";

interface FormulasProps {
  formulas: Formula[];
  userId: User["clerkId"];
}

export default function Formulas({ formulas, userId }: FormulasProps) {
  return (
    <div className="flex h-screen w-screen">
      <DisplayFormula />
      <div className="flex h-full w-96 justify-end">
        <div className="flex h-full w-full flex-col items-center space-y-3 overflow-y-auto bg-secondary p-3">
          {formulas.map((formula) => (
            <UserFormula key={formula.id} formula={formula} />
          ))}
        </div>
      </div>
    </div>
  );
}

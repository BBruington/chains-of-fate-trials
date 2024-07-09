"use client";

import { Formula, User } from "@prisma/client";
import UserFormula from "./formula";

interface FormulasProps {
  formulas: Formula[];
  userId: User["clerkId"];
}

export default function Formulas({ formulas, userId }: FormulasProps) {
  return (
    <div className="flex h-screen w-full justify-end">
      <div className="flex h-screen w-96 flex-col items-center overflow-y-auto bg-secondary p-3">
        {formulas.map((formula) => (
          <UserFormula key={formula.id} formula={formula} />
        ))}
      </div>
    </div>
  );
}

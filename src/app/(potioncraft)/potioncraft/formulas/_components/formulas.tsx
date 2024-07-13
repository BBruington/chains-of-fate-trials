"use client";

import { Formula, Rarity, User } from "@prisma/client";
import UserFormula from "./formula";
import DisplayFormula from "./displayFormula";
import { Button } from "@/components/ui/button";
import { addNewFormula } from "../actions";

interface FormulasProps {
  formulas: Formula[];
  userId: User["clerkId"];
}

export default function Formulas({ formulas, userId }: FormulasProps) {
  const handleAddNewFormula = async () => {
    const newFormula = {
      id: "",
      userId: "",
      name: "New Formula",
      description: "Add effect here",
      rarity: Rarity["EMPTY"],
      ingredient1: null,
      ingredient2: null,
      ingredient3: null,
      ingredient4: null,
    };
    await addNewFormula({ userId, formula: newFormula });
  };
  return (
    <div className="flex h-screen w-screen">
      <DisplayFormula />
      <div className="flex h-full w-96 justify-end">
        <div className="flex h-full w-full flex-col items-center space-y-3 overflow-y-auto bg-secondary p-3">
          <Button onClick={handleAddNewFormula}>Add New Formula</Button>
          {formulas.map((formula) => (
            <UserFormula key={formula.id} formula={formula} />
          ))}
        </div>
      </div>
    </div>
  );
}

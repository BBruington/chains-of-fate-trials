"use client";

import { Button } from "@/components/ui/button";
import { Formula, Rarity } from "@prisma/client";
import { addNewFormula } from "../actions";
import { User } from "@prisma/client";
import { HandleFilterFormulasProps } from "./formula-page";

interface AddFormulaButtonProps {
  userId: User["clerkId"];
  filteredFormulas: Formula[];
  handleFilterFormulas: ({
    event,
    formulas,
  }: HandleFilterFormulasProps) => void;
}

export default function AddFormulaButton({
  userId,
  handleFilterFormulas,
  filteredFormulas,
}: AddFormulaButtonProps) {
  const handleAddNewFormula = async () => {
    const newFormula = {
      id: "",
      userId: "",
      name: "New Formula",
      description: "Add effect here",
      rarity: Rarity["EMPTY"],
      ingredients: [],
    };
    const createdFormula = await addNewFormula({ userId, formula: newFormula });
    handleFilterFormulas({ formulas: [...filteredFormulas, createdFormula] });
  };

  return (
    <Button className="h-9" onClick={handleAddNewFormula}>
      Add New Formula
    </Button>
  );
}

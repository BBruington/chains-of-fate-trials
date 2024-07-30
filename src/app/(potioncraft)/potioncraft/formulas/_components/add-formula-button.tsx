"use client";

import { Button } from "@/components/ui/button";
import { Rarity } from "@prisma/client";
import { addNewFormula } from "../actions";
import { User } from "@prisma/client";

interface AddFormulaButtonProps {
  userId: User["clerkId"];
}

export default function AddFormulaButton({ userId }: AddFormulaButtonProps) {
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

  return <Button onClick={handleAddNewFormula}>Add New Formula</Button>;
}

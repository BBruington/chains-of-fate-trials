"use client";
import AddFormulaButton from "./add-formula-button";
import FormulaListItem from "./formula-list-item";
import { Formula } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import { useState } from "react";
import DisplayFormula from "./display-formula";
import { Luxurious_Roman, Cinzel } from "next/font/google";
import { cn } from "@/lib/utils";

const fontList = Luxurious_Roman({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
const fontHeader = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export type FormulaListProps = {
  userId: string;
  formulas: Formula[];
};

export type HandleFilterFormulasProps = {
  event?: ChangeEvent<HTMLInputElement> | undefined;
  formulas: Formula[];
};

export default function FormulaPage({ userId, formulas }: FormulaListProps) {
  const [filteredFormulas, setFilteredFormulas] = useState(formulas);
  const [filterFormulasInput, setFilteredFormulasInput] = useState("");

  const filterFormulas = (formulas: Formula[], input: string) => {
    return formulas.filter(({ name }) =>
      name.toLowerCase().includes(input.toLowerCase()),
    );
  };

  const handleFilterFormulas = ({
    event,
    formulas,
  }: HandleFilterFormulasProps) => {
    const input = event?.target.value ?? filterFormulasInput;
    setFilteredFormulasInput(input);
    setFilteredFormulas(input ? filterFormulas(formulas, input) : formulas);
  };

  return (
    <>
      <DisplayFormula
        filteredFormulas={filteredFormulas}
        handleFilterFormulas={handleFilterFormulas}
      />
      <div
        className={cn(fontList.className,
          "flex h-full w-96 flex-col items-center space-y-3 overflow-y-auto bg-secondary p-3",
        )}
      >
        <h2 className={cn(fontHeader.className, "w-full border-b text-center text-[28px]")}>My Formulas</h2>
        <Input
          className="h-9 border border-slate-600"
          aria-label="Filter formulas input"
          placeholder="Search"
          onChange={(event) => handleFilterFormulas({ event, formulas })}
        />
        <AddFormulaButton
          userId={userId}
          filteredFormulas={filteredFormulas}
          handleFilterFormulas={handleFilterFormulas}
        />
        {filteredFormulas.map((formula) => (
          <FormulaListItem key={formula.id} formula={formula} />
        ))}
      </div>
    </>
  );
}

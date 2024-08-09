"use client";
import AddFormulaButton from "./add-formula-button";
import FormulaListByName from "./formula-list-by-name";
import { Formula } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import DisplayFormula from "./display-formula";
import { Luxurious_Roman, Cinzel } from "next/font/google";
import { cn } from "@/lib/utils";
import { FormulaListProps, HandleFilterFormulasProps } from "../../_types";

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

const findFormulasMatchingName = (formulas: Formula[]) => {
  let solution = [];
  let formulaNames: string[] = [];
  for (let formula of formulas) {
    const formulasMatchingName = formulas.filter((f) => {
      return f.name === formula.name;
    });
    const foundName = formulaNames.find((item) => item === formula.name);
    if (!foundName) {
      formulaNames.push(formula.name);
      solution.push({
        name: formula.name,
        ingredientCombonations: formulasMatchingName.map((form) => form),
      });
    }
  }
  return solution;
};

export default function FormulaPage({ userId, formulas }: FormulaListProps) {
  const [filteredFormulas, setFilteredFormulas] = useState(formulas);
  const [filterFormulasInput, setFilteredFormulasInput] = useState("");

  const filteredFormulasByName = findFormulasMatchingName(filteredFormulas)

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

  console.log("filteredFormulasByName: ", filteredFormulasByName)

  return (
    <>
      <DisplayFormula
        filteredFormulas={filteredFormulas}
        handleFilterFormulas={handleFilterFormulas}
      />
      <div
        className={cn(
          fontList.className,
          "flex h-full w-96 flex-col items-center space-y-3 overflow-y-auto bg-secondary p-3",
        )}
      >
        <h2
          className={cn(
            fontHeader.className,
            "w-full border-b text-center text-[28px]",
          )}
        >
          My Formulas
        </h2>
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
        {filteredFormulasByName.map((formula, index) => (
            <FormulaListByName key={index} formulas={formula.ingredientCombonations} />
        ))}
      </div>
    </>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import type { Formula } from "@prisma/client";
import { useAtom } from "jotai";
import { displayFormaula } from "../jotaiAtoms";
import RecipeCombination from "./recipe-combination";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FormulaProps {
  formulas: Formula[];
}

export default function FormulaListByName({ formulas }: FormulaProps) {
  const [selectedFormula, setSelectedFormula] =
    useAtom<Formula>(displayFormaula);
  const handleSelectFormula = (formula: Formula) => {
    const newSelectedFormula = formulas.find((form) => form.id === formula.id);
    if (newSelectedFormula) setSelectedFormula(newSelectedFormula);
  };

  return (
    <>
      {formulas.length > 1 ? (
        <Accordion type="multiple">
          <AccordionItem value="item-1" className="border-none">
            <div className="flex h-fit w-72 flex-col items-center rounded-lg border border-secondary bg-secondary-foreground/70 text-secondary hover:cursor-pointer hover:bg-secondary-foreground/60">
              <AccordionTrigger className="flex flex-col hover:no-underline">
                <h1 className="w-fit border-b border-slate-500 px-5 text-center text-2xl font-bold">
                  {formulas[0].name}
                </h1>
                <h2 className="line-clamp-3 w-full whitespace-normal px-2">
                  <span className="font-bold">Effect:</span>{" "}
                  {formulas[0].description}
                </h2>
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <h2 className="border-b border-slate-500 px-3 text-center text-lg font-bold">
                  Ingredients
                </h2>
                {formulas.map((formula, index) => (
                  <>
                    <RecipeCombination
                      key={formula.id}
                      className="hover:bg-secondary-foreground/50"
                      formula={formula}
                      handleSelectFormula={handleSelectFormula}
                    />
                    {index !== formulas.length - 1 && (
                      <div className="flex items-center w-full justify-center">
                        <div className="h-[1px] w-1/3 bg-black" />
                        <span className="mx-1">OR</span>
                        <div className="h-[1px] w-1/3 bg-black" />
                      </div>
                    )}
                  </>
                ))}
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
      ) : (
        <Button
          aria-label={`select formula button`}
          onClick={() => handleSelectFormula(formulas[0])}
          className="flex h-fit w-72 flex-col items-center rounded-lg border border-secondary bg-secondary-foreground/70 text-secondary hover:cursor-pointer hover:bg-secondary-foreground/60"
        >
          <h1 className="w-fit border-b border-slate-500 px-5 text-center text-2xl font-bold">
            {formulas[0].name}
          </h1>
          <h2 className="line-clamp-3 w-full whitespace-normal px-2">
            <span className="font-bold">Effect:</span> {formulas[0].description}
          </h2>

          {formulas[0].ingredients.length === 0 ? (
            <></>
          ) : (
            <>
              <h2 className="border-b border-slate-500 px-3 text-lg font-bold">
                Ingredients
              </h2>
              <RecipeCombination
                handleSelectFormula={handleSelectFormula}
                key={formulas[0].id}
                formula={formulas[0]}
              />
            </>
          )}
        </Button>
      )}
    </>
  );
}

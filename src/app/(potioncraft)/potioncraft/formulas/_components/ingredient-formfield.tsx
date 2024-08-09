import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Formula } from "@prisma/client";
import { useAtom } from "jotai";
import { displayFormaula } from "../jotaiAtoms";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { ChangeEvent } from "react";
import { Trash2 } from "lucide-react";

type IngredientFormfieldProps = {
  className?: string;
  formulaIngredients: {
    name: string;
    id: number;
  }[];
  form: UseFormReturn<
    {
      name: string;
      description: string;
      rarity:
        | "EMPTY"
        | "COMMON"
        | "UNCOMMON"
        | "RARE"
        | "VERYRARE"
        | "LEGENDARY";
      ingredients: string[];
    },
    any,
    undefined
  >;
  editMode: boolean;
  ingredientIndex: number;
  ingredientName: string | null;
  field: ControllerRenderProps<
    {
      name: string;
      rarity:
        | "EMPTY"
        | "COMMON"
        | "UNCOMMON"
        | "RARE"
        | "VERYRARE"
        | "LEGENDARY";
      description: string;
      ingredients: string[];
    },
    "ingredients"
  >;
};

export default function IngredientFormfield({
  field,
  form,
  editMode,
  ingredientName,
  ingredientIndex,
  formulaIngredients,
  className,
}: IngredientFormfieldProps) {
  const [selectedFormula, setSelectedFormula] =
    useAtom<Formula>(displayFormaula);
  const handleRemoveIngredient = () => {
    setSelectedFormula({
      ...selectedFormula,
      ingredients: [
        ...selectedFormula.ingredients.filter(
          (ing, index) => ingredientIndex !== formulaIngredients[index].id,
        ),
      ],
    });
  };
  const handleIngredientOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const ingredientInput = event.target.value;
    const updatedFormulaIngredients = selectedFormula.ingredients.map(
      (ing, index) => {
        if (ingredientIndex === index) {
          return ingredientInput;
        }
        return ing;
      },
    );
    setSelectedFormula({
      ...selectedFormula,
      ingredients: updatedFormulaIngredients,
    });
  };

  if (ingredientName === null) return <></>;

  const notEditable =
    "border-none text-center hover:bg-transparent cursor-default";

  return (
    <div className="flex items-center">
      {editMode ? (
        <>
          <Input
            aria-label={`edit ingredient name input`}
            className={cn(
              className,
              "mr-5 text-base",
              !editMode && `${notEditable} text-lg`,
            )}
            placeholder="Ingredient Name"
            disabled={selectedFormula.id === "blank"}
            {...field}
            value={ingredientName}
            onChange={handleIngredientOnChange}
          />
          <Button
            aria-label="remove ingredient button"
            className={cn(
              className,
              "relative h-8 w-14 hover:bg-red-100",
              !editMode && notEditable,
            )}
            type="button"
            onClick={handleRemoveIngredient}
          >
            <Trash2 className="absolute h-5" />
          </Button>
        </>
      ) : (
        <h2
          aria-label={`edit ingredient name input`}
          className={cn(
            className,
            "mr-5 w-full text-center text-base",
            !editMode && `${notEditable} text-lg`,
          )}
        >
          {ingredientName}
        </h2>
      )}
    </div>
  );
}

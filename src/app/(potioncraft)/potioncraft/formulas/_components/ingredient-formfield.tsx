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
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { ChangeEvent } from "react";
import { Trash2 } from "lucide-react";

type IngredientFormfieldProps = {
  className?: string;
  handleChangeFormula: (
    event: ChangeEvent<HTMLInputElement>,
    key: string,
  ) => void;
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
      ingredient1: string;
      ingredient2: string;
      ingredient3: string;
      ingredient4: string;
    },
    any,
    undefined
  >;
  editMode: boolean;
  ingredientNum: "ingredient1" | "ingredient2" | "ingredient3" | "ingredient4";
  ingredientName: string | null;
};

export default function IngredientFormfield({
  form,
  ingredientNum,
  editMode,
  ingredientName,
  className,
  handleChangeFormula,
}: IngredientFormfieldProps) {
  const [selectedFormula, setSelectedFormula] =
    useAtom<Formula>(displayFormaula);
  const handleRemoveIngredient = () => {
    if (ingredientNum === "ingredient4") {
      setSelectedFormula({ ...selectedFormula, [ingredientNum]: null });
      return;
    }
    if (ingredientNum === "ingredient3") {
      setSelectedFormula({
        ...selectedFormula,
        ingredient3: selectedFormula.ingredient4,
        ingredient4: null,
      });
      return;
    }
    if (ingredientNum === "ingredient2") {
      setSelectedFormula({
        ...selectedFormula,
        ingredient2: selectedFormula.ingredient3,
        ingredient3: selectedFormula.ingredient4,
        ingredient4: null,
      });
      return;
    }
    if (ingredientNum === "ingredient1") {
      setSelectedFormula({
        ...selectedFormula,
        ingredient1: selectedFormula.ingredient2,
        ingredient2: selectedFormula.ingredient3,
        ingredient3: selectedFormula.ingredient4,
        ingredient4: null,
      });
      return;
    }
  };

  if (ingredientName === null) return <></>;

  const notEditable =
    "border-none text-center hover:bg-transparent cursor-default";

  return (
    <FormField
      control={form.control}
      name={ingredientNum}
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-col">
            <FormControl>
              <div className="flex items-center">
                <Input
                  aria-label={`edit ingredient name input`}
                  className={cn(
                    className,
                    "mr-5 text-base",
                    !editMode && `${notEditable} text-lg`,
                  )}
                  id={ingredientNum}
                  placeholder="Ingredient Name"
                  disabled={selectedFormula.id === "blank"}
                  {...field}
                  value={ingredientName}
                  onChange={(event) =>
                    handleChangeFormula(event, ingredientNum)
                  }
                />
                {editMode && (
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
                )}
              </div>
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
}

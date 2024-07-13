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

interface IngredientFormfieldProps {
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
  ingredient: "ingredient1" | "ingredient2" | "ingredient3" | "ingredient4";
}

export default function IngredientFormfield({
  form,
  ingredient,
}: IngredientFormfieldProps) {
  const [selectedFormula, setSelectedFormula] =
    useAtom<Formula>(displayFormaula);
  const handleRemoveIngredient = () => {
    setSelectedFormula({ ...selectedFormula, [ingredient]: null });
  };
  return (
    <FormField
      control={form.control}
      name={ingredient}
      render={({ field }) => (
        <FormItem>
          <div>
            <FormLabel htmlFor={ingredient}>Ingredient</FormLabel>
            <FormControl>
              <div className="flex">
                <Input
                  id={ingredient}
                  disabled={selectedFormula.id === "blank"}
                  {...field}
                />
                <Button type="button" onClick={handleRemoveIngredient}>
                  remove
                </Button>
              </div>
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
}

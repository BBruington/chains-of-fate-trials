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
  ingredientNum: "ingredient1" | "ingredient2" | "ingredient3" | "ingredient4";
  ingredientName: string | null;
}

export default function IngredientFormfield({
  form,
  ingredientNum,
  ingredientName,
}: IngredientFormfieldProps) {
  const [selectedFormula, setSelectedFormula] =
    useAtom<Formula>(displayFormaula);
  const handleRemoveIngredient = () => {
    if(ingredientNum === 'ingredient4'){
      setSelectedFormula({ ...selectedFormula, [ingredientNum]: null });
      return
    }
    if(ingredientNum === 'ingredient3'){
      setSelectedFormula({...selectedFormula, ingredient3: selectedFormula.ingredient4, ingredient4: null})
      return
    }
    if(ingredientNum === 'ingredient2'){
      setSelectedFormula({...selectedFormula,ingredient2: selectedFormula.ingredient3, ingredient3: selectedFormula.ingredient4, ingredient4: null})
      return
    }
    if(ingredientNum === 'ingredient1'){
      setSelectedFormula({...selectedFormula,ingredient1: selectedFormula.ingredient2, ingredient2: selectedFormula.ingredient3, ingredient3: selectedFormula.ingredient4, ingredient4: null})
      return
    }
  };

  if (ingredientName === null) return <></>;

  return (
    <FormField
      control={form.control}
      name={ingredientNum}
      render={({ field }) => (
        <FormItem>
          <div>
            <FormLabel htmlFor={ingredientNum}>Ingredient {ingredientName}</FormLabel>
            <FormControl>
              <div className="flex">
                <Input
                  id={ingredientNum}
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

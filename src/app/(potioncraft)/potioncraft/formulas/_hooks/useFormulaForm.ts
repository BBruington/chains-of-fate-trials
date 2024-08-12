import { MIXTURE_LIMIT, BLANK_FORMULA } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { FormFormulaSchema, FormData, UseFormulaFormProps } from "../../_types";
import { removeFormula, saveFormula } from "../actions";
import { useAtom } from "jotai";
import { Formula } from "@prisma/client";
import { displayFormaula } from "../jotaiAtoms";

export default function useFormulaForm({
  filteredFormulas,
  selectedFormula,
  handleFilterFormulas,
}: UseFormulaFormProps) {
  const [, setSelectedFormula] = useAtom<Formula>(displayFormaula);

  const handleChangeFormula = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    key: string,
  ) => {
    setSelectedFormula({ ...selectedFormula, [key]: event.target.value });
  };

  const formulaIngredients = selectedFormula.ingredients.map((ing, index) => {
    return { name: ing, id: index };
  });

  const handleAddIngredient = () => {
    if (selectedFormula.ingredients.length < MIXTURE_LIMIT) {
      setSelectedFormula({
        ...selectedFormula,
        ingredients: [...selectedFormula.ingredients, "New Ingredient"],
      });
    }
  };

  const handleRemoveFormula = async () => {
    await removeFormula({ formula: selectedFormula });
    handleFilterFormulas({
      formulas: filteredFormulas.filter(
        (formula) => formula.id !== selectedFormula.id,
      ),
    });
    setSelectedFormula(BLANK_FORMULA);
  };

  const form = useForm<FormData>({
    resolver: zodResolver(FormFormulaSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: ["Blank Ingredient"],
      rarity: "EMPTY",
    },
  });

  const { handleSubmit, reset } = form;

  const handleSaveFormula = async (formula: FormData) => {
    const updatedFormula = {
      id: selectedFormula.id,
      userId: selectedFormula.userId,
      name: formula.name === "" ? selectedFormula.name : formula.name,
      description:
        formula.description === ""
          ? selectedFormula.description
          : formula.description,
      rarity:
        formula.rarity === "EMPTY" ? selectedFormula.rarity : formula.rarity,
      ingredients: [...selectedFormula.ingredients],
    };
    reset();
    setSelectedFormula(updatedFormula);
    const updatedIndex = filteredFormulas.findIndex(
      (formula) => formula.id === updatedFormula.id,
    );
    filteredFormulas.splice(updatedIndex, 1, updatedFormula);
    handleFilterFormulas({
      formulas: filteredFormulas,
    });
    await saveFormula({
      formula: updatedFormula,
    });
  };

  return {
    form,
    handleSaveFormula,
    handleSubmit,
    handleRemoveFormula,
    handleAddIngredient,
    handleChangeFormula,
    formulaIngredients,
  };
}

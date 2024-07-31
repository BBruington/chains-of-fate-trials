"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Formula, Rarity } from "@prisma/client";
import { useAtom } from "jotai";
import { displayFormaula } from "../jotaiAtoms";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { removeFormula, saveFormula } from "../actions";
import { BLANK_FORMULA } from "@/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import IngredientFormfield from "./ingredient-formfield";
import {
  FormFormulaSchema,
  FormulaIngredientsProps,
  FormData,
} from "../../_types";
import Image from "next/image";
import parchment from "@/../public/background/parchment.png";
import { cn } from "@/lib/utils";

export default function DisplayFormula() {
  const [selectedFormula, setSelectedFormula] =
    useAtom<Formula>(displayFormaula);

  const formulaIngredients: FormulaIngredientsProps = [
    {
      ingredientNum: "ingredient1",
      ingredientName: selectedFormula.ingredient1,
    },
    {
      ingredientNum: "ingredient2",
      ingredientName: selectedFormula.ingredient2,
    },
    {
      ingredientNum: "ingredient3",
      ingredientName: selectedFormula.ingredient3,
    },
    {
      ingredientNum: "ingredient4",
      ingredientName: selectedFormula.ingredient4,
    },
  ];

  const handleAddIngredient = () => {
    if (selectedFormula.ingredient1 === null) {
      setSelectedFormula({
        ...selectedFormula,
        ingredient1: "Blank Ingredient",
      });
      return;
    }
    if (selectedFormula.ingredient2 === null) {
      setSelectedFormula({
        ...selectedFormula,
        ingredient2: "Blank Ingredient",
      });
      return;
    }
    if (selectedFormula.ingredient3 === null) {
      setSelectedFormula({
        ...selectedFormula,
        ingredient3: "Blank Ingredient",
      });
      return;
    }
    if (selectedFormula.ingredient4 === null) {
      setSelectedFormula({
        ...selectedFormula,
        ingredient4: "Blank Ingredient",
      });
      return;
    }
  };

  const handleRemoveFormula = async () => {
    await removeFormula({ formula: selectedFormula });
    setSelectedFormula(BLANK_FORMULA);
  };

  const form = useForm<FormData>({
    resolver: zodResolver(FormFormulaSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredient1: "",
      ingredient2: "",
      ingredient3: "",
      ingredient4: "",
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
      ingredient1:
        formula.ingredient1 === ""
          ? selectedFormula.ingredient1
          : formula.ingredient1,
      ingredient2:
        formula.ingredient2 === ""
          ? selectedFormula.ingredient2
          : formula.ingredient2,
      ingredient3:
        formula.ingredient3 === ""
          ? selectedFormula.ingredient3
          : formula.ingredient3,
      ingredient4:
        formula.ingredient4 === ""
          ? selectedFormula.ingredient4
          : formula.ingredient4,
    };
    reset();
    setSelectedFormula(updatedFormula);
    await saveFormula({
      formula: updatedFormula,
    });
  };

  const formBackground =
    "hover:bg-yellow-100 border border-slate-400 bg-transparent text-black";

  return (
    <Form {...form}>
      {selectedFormula.id === "empty" ? (
        <div className="flex h-full w-full flex-col items-center border bg-secondary-foreground/60 pt-10 text-3xl text-secondary">
          Select a Formula to Edit
        </div>
      ) : (
        <form
          className="flex w-full flex-col items-center justify-center border bg-secondary-foreground/60 text-secondary"
          onSubmit={handleSubmit(handleSaveFormula)}
        >
          <div
            className="fixed flex w-96 flex-col overflow-y-auto p-12"
            style={{ position: "relative" }}
          >
            <Image
              src={parchment}
              alt="Cover Image"
              className="mx-auto h-full w-full"
              style={{
                zIndex: -1,
                position: "absolute",
                right: 10,
                bottom: 10,
              }}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-3">
                    <FormLabel className="text-2xl" htmlFor="name">
                      Potion of {selectedFormula.name}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        className={formBackground}
                        disabled={selectedFormula.id === "Blank"}
                        placeholder="Formula Name"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-3">
                    <FormLabel className="text-2xl" htmlFor="description">
                      {selectedFormula.description}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="description"
                        disabled={selectedFormula.id === "Blank"}
                        className={formBackground}
                        placeholder="Formula Description"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rarity"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center mb-1">
                    <FormLabel className={"w-40 text-xl"} htmlFor="rarity">
                      Potion Rarity:
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className={cn(
                            formBackground,
                            "w-[180px] text-xl text-black",
                          )}
                        >
                          <SelectValue
                            className="text-secondary-foreground"
                            placeholder="Rarity"
                          >
                            {field.value === "EMPTY"
                              ? selectedFormula.rarity
                              : field.value}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Rarities</SelectLabel>
                            <SelectItem
                              {...field}
                              id="rarity"
                              value={Rarity["COMMON"]}
                            >
                              Common
                            </SelectItem>
                            <SelectItem
                              {...field}
                              id="rarity"
                              value={"UNCOMMON"}
                            >
                              Uncommon
                            </SelectItem>
                            <SelectItem
                              {...field}
                              id="rarity"
                              value={Rarity["RARE"]}
                            >
                              Rare
                            </SelectItem>
                            <SelectItem
                              {...field}
                              id="rarity"
                              value={Rarity["VERYRARE"]}
                            >
                              Very Rare
                            </SelectItem>
                            <SelectItem
                              {...field}
                              id="rarity"
                              value={Rarity["LEGENDARY"]}
                            >
                              Legendary
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <div className="h-0.5 w-4/5 my-2 self-center bg-slate-400"/>
            <div className="space-y-2">
              {formulaIngredients.map((ingredient) => (
                <IngredientFormfield
                  key={ingredient.ingredientNum}
                  ingredientNum={ingredient.ingredientNum}
                  ingredientName={ingredient.ingredientName}
                  className={formBackground}
                  form={form}
                />
              ))}
            </div>
            <Button
              className={cn(formBackground, "my-5", selectedFormula.ingredient4 !== null && "invisible h-0 my-0")}
              type="button"
              onClick={handleAddIngredient}
              disabled={
                selectedFormula.ingredient4 !== null ||
                selectedFormula.id === "empty"
              }
            >
              Add Ingredient
            </Button>
            <div>
              <Button
                className={cn(formBackground, "mr-3 hover:bg-red-200")}
                type="button"
                variant={"destructive"}
                disabled={selectedFormula.id === "empty"}
                onClick={handleRemoveFormula}
              >
                Delete Formula
              </Button>
              <Button
                className={cn(formBackground, "hover:bg-green-200")}
                type="submit"
                disabled={selectedFormula.id === "empty"}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      )}
    </Form>
  );
}

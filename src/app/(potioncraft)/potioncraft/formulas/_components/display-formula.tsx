"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Formula, Rarity } from "@prisma/client";
import { useAtom } from "jotai";
import { displayFormaula } from "../jotaiAtoms";
import { LockIcon, LockOpen } from "lucide-react";
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
import { useState } from "react";

export default function DisplayFormula() {
  const [selectedFormula, setSelectedFormula] =
    useAtom<Formula>(displayFormaula);

  const [editMode, setEditMode] = useState(false);
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

  const hidden = "invisible h-0";

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
              aria-label="parchment background image"
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
            <Toggle
              aria-label="edit mode toggle"
              className={cn(
                formBackground,
                "absolute right-8 top-5 w-9 border-none bg-transparent data-[state=on]:bg-yellow-100",
              )}
              pressed={editMode}
              onPressedChange={(event) => setEditMode(event)}
            >
              {editMode ? (
                <LockOpen className="bg-transparent text-black" />
              ) : (
                <LockIcon className="bg-transparent text-black" />
              )}
            </Toggle>
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
                        className={cn(formBackground, !editMode && hidden)}
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
                    <FormLabel
                      aria-label={`${selectedFormula.description} label`}
                      className="text-2xl"
                      htmlFor="description"
                    >
                      {selectedFormula.description}
                    </FormLabel>
                    <FormControl>
                      <Input
                        aria-label={`${selectedFormula.description} input`}
                        id="description"
                        disabled={selectedFormula.id === "Blank"}
                        className={cn(formBackground, !editMode && hidden)}
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
                  <div className="mb-1 flex items-center">
                    <FormLabel
                      aria-label={`potion rarity label`}
                      className={"w-40 text-xl"}
                      htmlFor="rarity"
                    >
                      Potion Rarity:
                    </FormLabel>
                    <FormControl>
                      <Select
                        disabled={!editMode}
                        aria-label={`potion rarity selecte`}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className={cn(
                            formBackground,
                            "w-[180px] text-xl text-black",
                            !editMode &&
                              "border-none hover:bg-transparent disabled:cursor-default disabled:opacity-100",
                          )}
                        >
                          <SelectValue
                            className="text-secondary-foreground"
                            placeholder="Rarity"
                            aria-label={`select rarity value ${selectedFormula.rarity}`}
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
                              aria-label={`common rarity select`}
                              {...field}
                              id="rarity"
                              value={Rarity["COMMON"]}
                            >
                              Common
                            </SelectItem>
                            <SelectItem
                              aria-label={`uncommon rarity select`}
                              {...field}
                              id="rarity"
                              value={"UNCOMMON"}
                            >
                              Uncommon
                            </SelectItem>
                            <SelectItem
                              aria-label={`rare rarity select`}
                              {...field}
                              id="rarity"
                              value={Rarity["RARE"]}
                            >
                              Rare
                            </SelectItem>
                            <SelectItem
                              aria-label={`very rare rarity select`}
                              {...field}
                              id="rarity"
                              value={Rarity["VERYRARE"]}
                            >
                              Very Rare
                            </SelectItem>
                            <SelectItem
                              aria-label={`legendary rarity select`}
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
            <div className="my-2 h-0.5 w-4/5 self-center bg-slate-400" />
            <h2 className="flex w-full justify-center text-2xl">Ingredients</h2>
            <div className="mb-2 h-[1px] w-3/5 self-center bg-slate-700" />
            <div className="space-y-2">
              {formulaIngredients.map((ingredient) => (
                <IngredientFormfield
                  key={ingredient.ingredientNum}
                  ingredientNum={ingredient.ingredientNum}
                  ingredientName={ingredient.ingredientName}
                  editMode={editMode}
                  className={formBackground}
                  form={form}
                />
              ))}
            </div>
            <Button
              aria-label={`add new ingredient button`}
              className={cn(
                formBackground,
                "my-5",
                selectedFormula.ingredient4 !== null && "invisible my-0 h-0",
                !editMode && hidden,
              )}
              type="button"
              onClick={handleAddIngredient}
              disabled={
                selectedFormula.ingredient4 !== null ||
                selectedFormula.id === "empty" ||
                !editMode
              }
            >
              Add Ingredient
            </Button>
            <div>
              <Button
                className={cn(
                  formBackground,
                  "mr-3 hover:bg-red-200",
                  !editMode && hidden,
                )}
                aria-label={`save changed button`}
                type="button"
                variant={"destructive"}
                disabled={selectedFormula.id === "empty" || !editMode}
                onClick={handleRemoveFormula}
              >
                Delete Formula
              </Button>
              <Button
                aria-label={`delete formula button`}
                className={cn(
                  formBackground,
                  "hover:bg-green-200",
                  !editMode && hidden,
                )}
                type="submit"
                disabled={selectedFormula.id === "empty" || !editMode}
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

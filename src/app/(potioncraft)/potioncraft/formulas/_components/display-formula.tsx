"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Formula, Rarity } from "@prisma/client";
import { useAtom } from "jotai";
import { displayFormaula } from "../jotaiAtoms";
import { LockIcon, LockOpen } from "lucide-react";
import { Cinzel } from "next/font/google";
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
import { BLANK_FORMULA, MIXTURE_LIMIT } from "@/constants";
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
import { FormFormulaSchema, FormData } from "../../_types";
import Image from "next/image";
import parchment from "@/../public/background/parchment.png";
import woodBackground from "@/../public/background/wood_table.jpg";
import { cn } from "@/lib/utils";
import { ChangeEvent, useState } from "react";
import { HandleFilterFormulasProps } from "./formula-page";
import { Textarea } from "@/components/ui/textarea";

const font = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

type DisplayFormulaProps = {
  filteredFormulas: Formula[];
  handleFilterFormulas: ({
    event,
    formulas,
  }: HandleFilterFormulasProps) => void;
};

export default function DisplayFormula({
  filteredFormulas,
  handleFilterFormulas,
}: DisplayFormulaProps) {
  const [selectedFormula, setSelectedFormula] =
    useAtom<Formula>(displayFormaula);

  const [editMode, setEditMode] = useState(false);

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

  const formBackground =
    "hover:bg-yellow-100 border border-slate-400 bg-transparent text-black";

  const notEditable =
    "border-none text-center hover:bg-transparent cursor-default";

  const hidden = "h-0 invisible";

  return (
    <Form {...form}>
      {selectedFormula.id === "empty" ? (
        <div className="relative flex h-full w-full">
          <div className="flex h-full w-full flex-col items-center border pt-10 text-3xl text-white">
            Select a Formula to Edit
          </div>
          <Image
            className="absolute h-full w-full"
            style={{ zIndex: -2 }}
            src={woodBackground}
            alt="wooden background image"
          />
        </div>
      ) : (
        <form
          className={`${font.className} relative flex w-full flex-col items-center justify-center border text-black`}
          onSubmit={handleSubmit(handleSaveFormula)}
        >
          <Image
            className="absolute h-full w-full"
            style={{ zIndex: -2 }}
            src={woodBackground}
            alt="wooden background image"
          />
          <div
            className={`fixed flex w-96 flex-col overflow-y-auto p-12`}
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
              aria-label="enable edit mode toggle"
              className={cn(
                formBackground,
                "absolute right-8 top-5 h-6 w-16 border-none bg-transparent data-[state=on]:bg-yellow-100",
              )}
              pressed={editMode}
              onPressedChange={(event: boolean) => setEditMode(event)}
            >
              {editMode ? (
                <div className="flex">
                  <span className="text-black">Edit</span>
                  <LockOpen className="h-4 shrink-0 bg-transparent text-black" />
                </div>
              ) : (
                <div className="flex">
                  <span className="text-black">Edit</span>
                  <LockIcon className="h-4 shrink-0 bg-transparent text-black" />
                </div>
              )}
            </Toggle>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-3">
                    <FormControl>
                      {editMode ? (
                        <Input
                          id="name"
                          className={cn(
                            formBackground,
                            !editMode && notEditable,
                            "text-2xl",
                          )}
                          disabled={selectedFormula.id === "Blank"}
                          placeholder="Formula Name"
                          {...field}
                          value={selectedFormula.name}
                          onChange={(event) =>
                            handleChangeFormula(event, "name")
                          }
                        />
                      ) : (
                        <h2
                          className={cn(
                            notEditable,
                            "text-center text-2xl font-bold",
                          )}
                        >
                          {selectedFormula.name}
                        </h2>
                      )}
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
                      className={"w-44 text-lg"}
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
                            "w-[180px] text-lg text-black",
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-3">
                    <FormControl>
                      {editMode ? (
                        <Textarea
                          aria-label={`${selectedFormula.description} input`}
                          id="description"
                          disabled={selectedFormula.id === "Blank"}
                          className={cn(
                            formBackground,
                            !editMode && notEditable,
                            "text-sm",
                          )}
                          placeholder="Formula Description"
                          {...field}
                          value={selectedFormula.description}
                          onChange={(event) =>
                            handleChangeFormula(event, "description")
                          }
                        />
                      ) : (
                        <p className={cn(notEditable, "text-left text-sm")}>
                          {selectedFormula.description}
                        </p>
                      )}
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <div className="my-2 h-0.5 w-4/5 self-center bg-slate-400" />
            <h2
              className={cn(
                notEditable,
                "mb-2 flex w-full justify-center text-2xl",
              )}
            >
              Ingredients
            </h2>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name={"ingredients"}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col">
                      <FormControl>
                        <>
                          {selectedFormula.ingredients.map(
                            (ingredient, index) => (
                              <IngredientFormfield
                                key={index}
                                field={field}
                                formulaIngredients={formulaIngredients}
                                ingredientName={ingredient}
                                ingredientIndex={index}
                                editMode={editMode}
                                className={formBackground}
                                form={form}
                              />
                            ),
                          )}
                        </>
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button
              aria-label={`add new ingredient button`}
              className={cn(
                formBackground,
                "my-5",
                selectedFormula.ingredients.length === MIXTURE_LIMIT &&
                  "invisible my-0 h-0",
                !editMode && hidden,
              )}
              type="button"
              onClick={handleAddIngredient}
              disabled={
                selectedFormula.ingredients.length === MIXTURE_LIMIT ||
                selectedFormula.id === "empty" ||
                !editMode
              }
            >
              Add Ingredient
            </Button>
            <div className="flex justify-center">
              <Button
                className={cn(
                  formBackground,
                  "mr-3 bg-red-100 hover:bg-red-200",
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
                  "bg-green-50 hover:bg-green-200",
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

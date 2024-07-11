"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Formula } from "@prisma/client";
import { useAtom } from "jotai";
import { displayFormaula } from "../jotaiAtoms";
import { ChangeEvent } from "react";
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

export default function DisplayFormula() {
  const [selectedFormula, setSelectedFormula] =
    useAtom<Formula>(displayFormaula);
  const handleAddIngredient = () => {
    console.log(selectedFormula)
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

  const handleInputOnChange = (event: ChangeEvent) => {
    // const {target, value} = event;
    // setSelectedFormula({...selectedFormula, ingredient1: value})
  };

  type FormData = z.infer<typeof FormFormulaSchema>;

  const FormFormulaSchema = z.object({
    // rarity: z.enum(["EMPTY", "COMMON", "UNCOMMON", "RARE", "VERYRARE", "LEGENDARY"]),
    name: z.string(),
    description: z.string(),
    ingredient1: z.string(),
    ingredient2: z.string(),
    ingredient3: z.string(),
    ingredient4: z.string(),
  });

  const form = useForm<FormData>({
    resolver: zodResolver(FormFormulaSchema),
    defaultValues: {
      name: selectedFormula.name || "",
      description: selectedFormula.description || "",
      ingredient1: "",
      ingredient2: "",
      ingredient3: "",
      ingredient4: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (formula: FormData) => {
    setSelectedFormula({
      ...formula,
      id: selectedFormula.id,
      userId: selectedFormula.userId,
      rarity: selectedFormula.rarity,
      ingredient1: formula.ingredient1 === '' ? null : formula.ingredient1,
      ingredient2: formula.ingredient2 === '' ? null : formula.ingredient2,
      ingredient3: formula.ingredient3 === '' ? null : formula.ingredient3,
      ingredient4: formula.ingredient4 === '' ? null : formula.ingredient4,
    })
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-start border bg-secondary-foreground/60 text-secondary"
      >
        <div className="flex flex-col">
          <Button
            onClick={handleAddIngredient}
            disabled={selectedFormula.ingredient4 !== null}
          >
            Add Ingredient
          </Button>
          <Button disabled={selectedFormula.id === "empty"}>
            Save Changes
          </Button>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel className="text-2xl" htmlFor="name">
                    Formula Name: {selectedFormula.name}
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      disabled={selectedFormula.name === "Blank"}
                      placeholder="formula title"
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          {selectedFormula.ingredient1 && (
            <FormField
              control={form.control}
              name="ingredient1"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel htmlFor="ingredient1">
                      Ingredient: {selectedFormula.ingredient1}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="ingredient1"
                        disabled={selectedFormula.ingredient1 === "Blank"}
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          )}
          {selectedFormula.ingredient2 && (
            <FormField
              control={form.control}
              name="ingredient2"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel htmlFor="ingredient2">
                    Ingredient: {selectedFormula.ingredient2}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="ingredient2"
                        disabled={selectedFormula.ingredient2 === "Blank"}
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          )}
          {selectedFormula.ingredient3 && (
            <FormField
              control={form.control}
              name="ingredient3"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel htmlFor="ingredient3">
                    Ingredient: {selectedFormula.ingredient3}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="ingredient3"
                        disabled={selectedFormula.ingredient3 === "Blank"}
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          )}
          {selectedFormula.ingredient4 && (
            <FormField
              control={form.control}
              name="ingredient4"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel htmlFor="ingredient4">
                    Ingredient: {selectedFormula.ingredient4}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="ingredient4"
                        disabled={selectedFormula.ingredient4 === "Blank"}
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          )}
        </div>
      </form>
    </Form>
  );
}

"use client";
import {
  ALL_RARITIES,
  BLANK_MIXTURE_PROPERTIES,
  EMPTY_MIXTURE,
  INGREDIENT_RARITY_ORDER,
} from "@/constants";
import { useState } from "react";
import { z } from "zod";
import IngredientHooks from "./ingredients-hooks";
import PotionHooks from "./potions-hooks";
import { IngredientSchema } from "../../../../../prisma/generated/zod";
import { addFormulaToUser } from "../actions";
import {
  UsePotionCraftProps,
  MagicProperties,
  AddFormulaProps,
  mixturePropertiesSchema,
  AddIngredientsToMixtureProps,
  DoesFormulaExistProps,
} from "./types";

export function usePotionCraft({ ingredients, userId }: UsePotionCraftProps) {
  const [mixture, setMixture] =
    useState<z.infer<typeof IngredientSchema>[]>(EMPTY_MIXTURE);
  const [userIngredients, setUserIngredients] =
    useState<z.infer<typeof IngredientSchema>[]>(ingredients);
  const [filteredUserIngredients, setFilteredUserIngredients] =
    useState(userIngredients);
  const [filteredIngredientsInput, setFilteredIngredientsInput] = useState("");
  const [mixtureProperties, setMixtureProperties] = useState(
    BLANK_MIXTURE_PROPERTIES,
  );
  const [activeIngredient, setActiveIngredient] = useState<null | z.infer<
    typeof IngredientSchema
  >>(null);

  const {
    handleAddIngredients,
    handleFilterIngredients,
    handleOrderFilteredIngredients,
    handleIngredientDragStart,
    handleIngredientDragEnd,
    handleResetIngredients,
    updateClientIngredientQuantity,
    updateServerIngredientQuantity,
  } = IngredientHooks({
    mixture,
    ingredients,
    userIngredients,
    filteredUserIngredients,
    filteredIngredientsInput,
    findMixtureProperties,
    setFilteredUserIngredients,
    setFilteredIngredientsInput,
    setActiveIngredient,
    setUserIngredients,
    setMixture,
  });

  const { findPotion, handleCraftPotion } = PotionHooks({
    mixtureProperties,
    mixture,
    userId,
    setMixture,
    findMixtureProperties,
  });

  function findMixtureProperties(
    ingredients: z.infer<typeof IngredientSchema>[],
  ): z.infer<typeof mixturePropertiesSchema> {
    if (ingredients.length === 0) {
      setMixtureProperties(BLANK_MIXTURE_PROPERTIES);
      return BLANK_MIXTURE_PROPERTIES;
    }

    let currentRarity = 0;

    for (let ingredient of ingredients) {
      currentRarity = Math.max(
        INGREDIENT_RARITY_ORDER[ingredient.rarity],
        currentRarity,
      );
    }

    const allIngredientsHighestRarity = ingredients.filter(
      (ingredient) => ALL_RARITIES[currentRarity] === ingredient.rarity,
    );

    const magicTypesOfHighestRarity = allIngredientsHighestRarity.map(
      (ingredient) => {
        return ingredient.type;
      },
    );

    const mixtureAttributes = ingredients.reduce(
      (ingredientSum, currentIngretient) => {
        return {
          id: "1",
          name: "",
          description: "",
          quantity: 0,
          userId: "",
          rarity: ALL_RARITIES[currentRarity],
          type: "ARCANE",
          primaryAttribute: "ABJURATION",
          abjuration: ingredientSum.abjuration + currentIngretient.abjuration,
          conjuration:
            ingredientSum.conjuration + currentIngretient.conjuration,
          divination: ingredientSum.divination + currentIngretient.divination,
          enchantment:
            ingredientSum.enchantment + currentIngretient.enchantment,
          evocation: ingredientSum.evocation + currentIngretient.evocation,
          illusion: ingredientSum.illusion + currentIngretient.illusion,
          necromancy: ingredientSum.necromancy + currentIngretient.necromancy,
          transmutation:
            ingredientSum.transmutation + currentIngretient.transmutation,
        };
      },
    );

    const properties = {
      abjuration: mixtureAttributes.abjuration,
      conjuration: mixtureAttributes.conjuration,
      divination: mixtureAttributes.divination,
      enchantment: mixtureAttributes.enchantment,
      evocation: mixtureAttributes.evocation,
      illusion: mixtureAttributes.illusion,
      necromancy: mixtureAttributes.necromancy,
      transmutation: mixtureAttributes.transmutation,
    };

    const propertiesArray = Object.values(properties);
    const maxValue = Math.max(...propertiesArray);

    const primaryAttribute = Object.keys(properties).filter(
      (key) => properties[key as keyof MagicProperties] === maxValue,
    );

    if (primaryAttribute.length !== 1) {
      setMixtureProperties(BLANK_MIXTURE_PROPERTIES);
      return BLANK_MIXTURE_PROPERTIES;
    }

    const mix = {
      ...properties,
      primaryAttribute: primaryAttribute[0].toUpperCase(),
      rarity: ALL_RARITIES[currentRarity],
      magicTypes: magicTypesOfHighestRarity,
    };

    setMixtureProperties(mix);
    return mix;
  }

  const addFormula = async ({ mixture, userId, potion }: AddFormulaProps) => {
    const ingredients = mixture.filter((mix) => mix.id !== "empty");
    await addFormulaToUser({ ingredients, potion, userId });
  };

  const addIngredientToMixture = ({
    ingredient,
    mixture,
  }: AddIngredientsToMixtureProps) => {
    const emptyMixtureIndex = mixture.findIndex((ing) => ing.id === "empty");
    if (emptyMixtureIndex === -1) return;
    const updatedMixture = mixture.map((ing, index) => {
      if (index === emptyMixtureIndex) {
        return ingredient;
      }
      return ing;
    });
    setMixture(updatedMixture);
    findMixtureProperties(updatedMixture);
    updateClientIngredientQuantity({
      ingredients: userIngredients,
      activeIng: ingredient,
      quantity: -1,
    });
  };

  function compareArrays(array1: string[], array2: string[]) {
    if (array1.length != array2.length) {
      return false;
    }

    array1 = array1.slice();
    array1.sort();
    array2 = array2.slice();
    array2.sort();

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] != array2[i]) {
        return false;
      }
    }
    return true;
  }

  const isFormulaSaved = ({
    mixtureIngredients,
    userFormulas,
    formulaName,
  }: DoesFormulaExistProps): boolean => {
    const foundFormulas = userFormulas.filter(
      (formula) => formula.name === formulaName,
    );
    if (foundFormulas.length > 0) {
      const ingredientNames = mixtureIngredients.map((ing) => ing.name);
      for (let formula of foundFormulas) {
        const doesExist = compareArrays(formula.ingredients, ingredientNames);
        if (doesExist) return true;
      }
    }

    return false;
  };

  return {
    mixture,
    userIngredients,
    activeIngredient,
    mixtureProperties,
    filteredUserIngredients,
    findPotion,
    addFormula,
    isFormulaSaved,
    handleCraftPotion,
    handleAddIngredients,
    findMixtureProperties,
    handleResetIngredients,
    addIngredientToMixture,
    handleIngredientDragEnd,
    handleFilterIngredients,
    handleIngredientDragStart,
    handleOrderFilteredIngredients,
    updateServerIngredientQuantity,
  };
}

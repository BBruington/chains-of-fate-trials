"use client";
import { EMPTY_INGREDIENT, EMPTY_POTION } from "@/constants";
import { User } from "@prisma/client";
import { useState } from "react";
import { z } from "zod";
import { IngredientHooks } from "./ingredients-hooks";
import {
  IngredientSchema,
  RarityType,
} from "../../../../../../prisma/generated/zod";
import { PotionSchema } from "@/types";
import {
  spendIngredients,
  addPotionToUser,
  addFormulaToUser,
  changeIngredientQuantity,
} from "../../actions";
import { commonPotions } from "../testData";
import {
  HandleIngredientQuantityChangeProps,
  UsePotionCraftProps,
  MagicProperties,
  AddFormulaProps,
  mixturePropertiesSchema,
  findPotionSchema,
} from "./types";

export function usePotionCraft({ ingredients, userId }: UsePotionCraftProps) {
  const initialPotionProperties = {
    magicTypes: ["EMPTY"],
    rarity: "EMPTY",
    primaryAttribute: "EMPTY",
    abjuration: 0,
    conjuration: 0,
    divination: 0,
    enchantment: 0,
    evocation: 0,
    illusion: 0,
    necromancy: 0,
    transmutation: 0,
  };

  const emptyMixture = [
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
  ];

  const [mixture, setMixture] =
    useState<z.infer<typeof IngredientSchema>[]>(emptyMixture);
  const [userIngredients, setUserIngredients] =
    useState<z.infer<typeof IngredientSchema>[]>(ingredients);
  const [filteredUserIngredients, setFilteredUserIngredients] =
    useState(userIngredients);
  const [filteredIngredientsInput, setFilteredIngredientsInput] = useState("");
  const [mixtureProperties, setMixtureProperties] = useState(
    initialPotionProperties,
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
  } = IngredientHooks({
    userIngredients,
    filteredUserIngredients,
    mixture,
    userId,
    filteredIngredientsInput,
    findMixtureProperties,
    setFilteredUserIngredients,
    setFilteredIngredientsInput,
    setActiveIngredient,
    setUserIngredients,
    setMixture,
  });

  const handleResetIngredients = () => {
    setUserIngredients(ingredients);
    handleFilterIngredients({ ingredients });
    setMixture(emptyMixture);
  };

  const handleCraftPotion = async () => {
    const potion = findPotion({ mixture: mixtureProperties });
    const spentIngredients = mixture.filter((mix) => mix.id !== "empty");
    await spendIngredients({ ingredients: spentIngredients });
    const resetMix = { ...EMPTY_INGREDIENT };
    setMixture(emptyMixture);
    if (potion === undefined) {
      console.log("potion craft failed! D:");
    } else {
      await addPotionToUser({ potion, userId });
    }
    findMixtureProperties([resetMix]);
  };

  const handleChangeIngredientQuantity = async ({
    ingredient,
    quantity,
  }: HandleIngredientQuantityChangeProps) => {
    const res = await changeIngredientQuantity({ ingredient, quantity });
    const changedIngredients = userIngredients.map((userIngredient) => {
      if (userIngredient.id === ingredient.id) {
        return {
          ...userIngredient,
          quantity: userIngredient.quantity + quantity,
        };
      }
      return userIngredient;
    });
    if (res) {
      setUserIngredients(changedIngredients);
      handleFilterIngredients({ ingredients: changedIngredients });
    }
  };

  //get potions of appropriate rarity
  //find craftable potion(s) with mixture: potion primary attribute === mixture primary attribute
  //check requirements for potion vs mixture ie: required type(s)
  //check secondary attributes to define quality / which potion to use

  function findPotion(
    props: z.infer<typeof findPotionSchema>,
  ): z.infer<typeof PotionSchema> | undefined {
    const { mixture } = findPotionSchema.parse(props);

    let potions = commonPotions;

    if (mixture.rarity === "COMMON") potions = commonPotions;

    const potionsMatchingPrimaryAttribute = potions?.filter(
      (potion) =>
        potion[mixture.primaryAttribute as keyof MagicProperties] ===
        mixture[mixture.primaryAttribute as keyof MagicProperties],
    );

    if (
      potionsMatchingPrimaryAttribute === undefined ||
      potionsMatchingPrimaryAttribute.length === 0
    )
      return;

    const potionSecondaryAttributes = potionsMatchingPrimaryAttribute.map(
      (potion) => {
        const potionKeys = Object.keys(initialPotionProperties);
        const matchingSecondaryAttributes = potionKeys.filter((key) => {
          const potionValue = Math.max(potion[key as keyof MagicProperties], 0);
          const combinedValue = Math.max(
            mixtureProperties[key as keyof MagicProperties],
            0,
          );
          return (
            potionValue === combinedValue &&
            potionValue !== 0 &&
            key.toUpperCase() !== potion.primaryAttribute
          );
        });
        return { potion, secondaryAttributes: matchingSecondaryAttributes };
      },
    );

    const answer = potionSecondaryAttributes.reduce(
      (initialPotion, nextPotion) => {
        if (
          initialPotion.secondaryAttributes.length ===
          nextPotion.secondaryAttributes.length
        ) {
          const randomPotion = Math.floor(Math.random() * 2);
          return [initialPotion, nextPotion][randomPotion];
        }
        if (
          initialPotion.secondaryAttributes.length >
          nextPotion.secondaryAttributes.length
        ) {
          return initialPotion;
        } else return nextPotion;
      },
    );
    return answer.potion;
  }

  function findMixtureProperties(
    ingredients: z.infer<typeof IngredientSchema>[],
  ): z.infer<typeof mixturePropertiesSchema> {
    if (ingredients.length === 0) {
      setMixtureProperties(initialPotionProperties);
      return initialPotionProperties;
    }
    const ingredientRarity = {
      EMPTY: 0,
      COMMON: 1,
      UNCOMMON: 2,
      RARE: 3,
      VERYRARE: 4,
      LEGENDARY: 5,
    };
    let currentRarity = 0;
    const allRarities: RarityType[] = [
      "EMPTY",
      "COMMON",
      "UNCOMMON",
      "RARE",
      "VERYRARE",
      "LEGENDARY",
    ];
    for (let ingredient of ingredients) {
      currentRarity = Math.max(
        ingredientRarity[ingredient.rarity],
        currentRarity,
      );
    }

    const allIngredientsHighesRarity = ingredients.filter(
      (ingredient) => allRarities[currentRarity] === ingredient.rarity,
    );

    const magicTypesOfHighestRarity = allIngredientsHighesRarity.map(
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
          rarity: allRarities[currentRarity],
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
      setMixtureProperties(initialPotionProperties);
      return initialPotionProperties;
    }

    setMixtureProperties({
      ...properties,
      primaryAttribute: primaryAttribute[0],
      rarity: allRarities[currentRarity],
      magicTypes: magicTypesOfHighestRarity,
    });
    return {
      ...properties,
      primaryAttribute: primaryAttribute[0],
      rarity: allRarities[currentRarity],
      magicTypes: magicTypesOfHighestRarity,
    };
  }

  const addFormula = async ({ mixture, userId }: AddFormulaProps) => {
    const ingredients = mixture.filter((mix) => mix.id !== "empty");
    let potion = findPotion({ mixture: mixtureProperties });
    if (potion === undefined) potion = EMPTY_POTION;

    await addFormulaToUser({ ingredients, potion, userId });
  };

  return {
    mixture,
    userIngredients,
    filteredUserIngredients,
    activeIngredient,
    mixtureProperties,
    findMixtureProperties,
    findPotion,
    addFormula,
    handleFilterIngredients,
    handleOrderFilteredIngredients,
    handleResetIngredients,
    handleAddIngredients,
    handleCraftPotion,
    handleChangeIngredientQuantity,
    handleIngredientDragStart,
    handleIngredientDragEnd,
  };
}

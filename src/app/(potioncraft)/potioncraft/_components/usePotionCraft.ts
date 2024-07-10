"use client";
import { EMPTY_INGREDIENT } from "@/constants";
import { DragStartEvent, DragOverEvent } from "@dnd-kit/core";
import { Ingredient, User } from "@prisma/client";
import { useState } from "react";
import { z } from "zod";
import {
  IngredientSchema,
  RarityType,
} from "../../../../../prisma/generated/zod";
import { PotionSchema } from "@/types";
import { HandleFilterIngredientsProps } from "../_types";
import {
  addIngredientsToUser,
  spendIngredients,
  addPotionToUser,
  increaseIngredient,
} from "../actions";
import { commonPotions } from "./testData";

export function usePotionCraft(
  ingredients: Ingredient[],
  userId: User["clerkId"],
) {
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

  const [mixture, setMixture] = useState<Ingredient[]>(emptyMixture);
  const [userIngredients, setUserIngredients] =
    useState<Ingredient[]>(ingredients);
  const [filteredUserIngredients, setFilteredUserIngredients] =
    useState(userIngredients);
  const [filteredIngredientsInput, setFilteredIngredientsInput] = useState("");
  const [mixtureProperties, setMixtureProperties] = useState(
    initialPotionProperties,
  );
  const [activeIngredient, setActiveIngredient] = useState<null | Ingredient>(
    null,
  );

  const handleFilterIngredients = ({
    event,
    ingredients,
  }: HandleFilterIngredientsProps) => {
    if (event?.target.value === "") {
      setFilteredUserIngredients(userIngredients);
      return;
    }
    const ingredientInput = event?.target.value
      ? event?.target.value
      : filteredIngredientsInput;
    setFilteredIngredientsInput(ingredientInput);
    if (ingredients) {
      const filteredIngredients = ingredients.filter((filter) => {
        const name = filter.name.toLowerCase();
        return name.includes(ingredientInput.toLowerCase());
      });
      setFilteredUserIngredients(filteredIngredients);
    } else {
      const filteredIngredients = userIngredients.filter((filter) => {
        const name = filter.name.toLowerCase();
        return name.includes(ingredientInput.toLowerCase());
      });
      setFilteredUserIngredients(filteredIngredients);
    }
  };

  const handleResetIngredients = () => {
    setUserIngredients(ingredients);
    handleFilterIngredients({ ingredients });
    setMixture(emptyMixture);
  };

  interface AddIngredientsProps {
    userId: User["clerkId"];
    ingredients: Ingredient[];
  }

  const handleAddIngredients = async ({
    ingredients,
    userId,
  }: AddIngredientsProps) => {
    if (userIngredients.length === 0) {
      await addIngredientsToUser({ userId, ingredients });
    }
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
  const handleIncrementIngredient = async ({
    ingredient,
  }: {
    ingredient: z.infer<typeof IngredientSchema>;
  }) => {
    const res = await increaseIngredient({ ingredient, amount: 1 });
    const incrementedIngredients = userIngredients.map((userIngredient) => {
      if (userIngredient.id === ingredient.id) {
        return { ...userIngredient, quantity: userIngredient.quantity + 1 };
      }
      return userIngredient;
    });
    if (res) {
      setUserIngredients(incrementedIngredients);
      handleFilterIngredients({ ingredients: incrementedIngredients });
    }
  };

  type MagicProperties = {
    abjuration: number;
    conjuration: number;
    divination: number;
    enchantment: number;
    evocation: number;
    illusion: number;
    necromancy: number;
    transmutation: number;
  };

  const mixturePropertiesSchema = z.object({
    magicTypes: z.array(z.string()),
    rarity: z.string(),
    primaryAttribute: z.string(),
    abjuration: z.number(),
    conjuration: z.number(),
    divination: z.number(),
    enchantment: z.number(),
    evocation: z.number(),
    illusion: z.number(),
    necromancy: z.number(),
    transmutation: z.number(),
  });

  const findPotionSchema = z.object({
    mixture: mixturePropertiesSchema,
  });

  //get potions of appropriate rarity
  //find craftable potion(s) with mixture: potion primary attribute === mixture primary attribute
  //check requirements for potion vs mixture ie: required type(s)
  //check secondary attributes to define quality / which potion to use

  function findPotion(
    props: z.infer<typeof findPotionSchema>,
  ): z.infer<typeof PotionSchema> | undefined {
    const { mixture } = findPotionSchema.parse(props);

    let potions;

    if (mixture.rarity === "COMMON") potions = commonPotions;

    potions?.filter(
      (potion) =>
        potion[mixture.primaryAttribute as keyof MagicProperties] ===
        mixture[mixture.primaryAttribute as keyof MagicProperties],
    );
    if (potions === undefined) return;

    const potionSecondaryAttributes = potions.map((potion) => {
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
    });

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

    console.log(potionSecondaryAttributes);
    console.log(answer.potion);

    return potions.find((potion) => {
      return Object.keys(initialPotionProperties).every((key) => {
        const potionValue = Math.max(potion[key as keyof MagicProperties], 0);
        const combinedValue = Math.max(
          mixtureProperties[key as keyof MagicProperties],
          0,
        );
        return potionValue === combinedValue;
      });
    });
  }

  //find highest ingredient(s) rarity and type
  //find primary attribute
  //find attribute values

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

    const MagicTypesOfHighestRarity = allIngredientsHighesRarity.map(
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
      return initialPotionProperties;
    }

    console.log({
      ...properties,
      primaryAttribute: primaryAttribute[0],
      rarity: allRarities[currentRarity],
      magicTypes: MagicTypesOfHighestRarity,
    });

    setMixtureProperties({
      ...properties,
      primaryAttribute: primaryAttribute[0],
      rarity: allRarities[currentRarity],
      magicTypes: MagicTypesOfHighestRarity,
    });
    return {
      ...properties,
      primaryAttribute: primaryAttribute[0],
      rarity: allRarities[currentRarity],
      magicTypes: MagicTypesOfHighestRarity,
    };
  }

  function handleIngredientDragStart(event: DragStartEvent) {
    const { active } = event;
    const activeIng = userIngredients.find(
      (ingredient) => ingredient.id === active.id,
    );
    if (activeIng) setActiveIngredient(activeIng);
  }

  function handleIngredientDragEnd(event: DragOverEvent) {
    setActiveIngredient(null);
    const { active, over } = event;
    const activeItem = userIngredients.find((item) => item.id === active.id);
    if (over !== null && activeItem !== undefined) {
      if (mixture[Number(over?.id)].id !== "empty") return;
      const newMixture = mixture.map((mix, index) => {
        if (index === over.id) {
          return activeItem;
        }
        return mix;
      });
      setMixture(newMixture);
      findMixtureProperties(newMixture);
      if (activeItem.quantity === 1) {
        const ingredientsWithoutActive = userIngredients.filter(
          (item) => item !== activeItem,
        );
        setUserIngredients(ingredientsWithoutActive);
        handleFilterIngredients({ ingredients: ingredientsWithoutActive });
      } else {
        const newUserIngredients = userIngredients.map((ingredient) => {
          if (ingredient.id === activeItem.id) {
            return { ...ingredient, quantity: ingredient.quantity - 1 };
          }
          return ingredient;
        });
        setUserIngredients(newUserIngredients);
        handleFilterIngredients({ ingredients: newUserIngredients });
      }
    }
  }

  return {
    mixture,
    userIngredients,
    filteredUserIngredients,
    activeIngredient,
    mixtureProperties,
    findMixtureProperties,
    findPotion,
    handleFilterIngredients,
    handleResetIngredients,
    handleAddIngredients,
    handleCraftPotion,
    handleIncrementIngredient,
    handleIngredientDragStart,
    handleIngredientDragEnd,
  };
}

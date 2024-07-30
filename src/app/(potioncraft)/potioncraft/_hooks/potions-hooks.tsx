import { z } from "zod";
import { commonPotions } from "../_components/testData";
import { PotionSchema } from "@/types";
import { findPotionSchema, MagicProperties, PotionHooksProps } from "./types";
import { EMPTY_INGREDIENT } from "@/constants";
import { spendIngredients, addPotionToUser } from "../actions";

const emptyMixture = [
  EMPTY_INGREDIENT,
  EMPTY_INGREDIENT,
  EMPTY_INGREDIENT,
  EMPTY_INGREDIENT,
];

export function PotionHooks({
  mixtureProperties,
  mixture,
  setMixture,
  findMixtureProperties,
  userId,
}: PotionHooksProps) {
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

  return { findPotion, handleCraftPotion };
}

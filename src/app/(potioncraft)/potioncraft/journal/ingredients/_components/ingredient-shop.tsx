"use client"
import { playerIngredients } from "../../../_components/testData";
import { IngredientSchema } from "../../../../../../../prisma/generated/zod";
import { addIngredientsToUser } from "../../../actions";
import { z } from "zod";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface IngredientShopProps {
  userId: string;
}
export default function IngredientShop({ userId }: IngredientShopProps) {
  return (
    <div className="flex flex-col">
      {playerIngredients.map((ingredient) => (
        <IngredientShopItem key={ingredient.name} userId={userId} ingredient={ingredient} />
      ))}
    </div>
  );
}

interface IngredientShopItemProps {
  ingredient: z.infer<typeof IngredientSchema>;
  userId: User["clerkId"]
}

function IngredientShopItem({ ingredient, userId }: IngredientShopItemProps) {
  const handleAddIngredientToUser = async () => {
    await addIngredientsToUser({userId, ingredients: [ingredient]})
  }

  return (
    <div className="flex">
      <span>{ingredient.name}</span>
      <Button onClick={handleAddIngredientToUser} className="ml-3 h-7">Add</Button>
    </div>
  );
}

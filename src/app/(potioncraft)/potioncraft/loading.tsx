import { EMPTY_INGREDIENT } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

export default function Loading() {
  const emptyMixture = [
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
  ];

  return (
    <div className="flex w-screen justify-between">
      <div></div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-7 text-3xl">Add Ingredients to Make a Potion</h1>
        <div className="grid grid-cols-2 content-center">
          {emptyMixture.map((mix, index) => (
            <div
              key={index}
              className={`inline-flex h-32 w-52 items-center justify-center whitespace-nowrap rounded-md border bg-secondary text-xs font-medium ${mix.id === "empty" ? "bg-secondary/60 text-primary/60" : ""}`}
            >
              {mix.name}
            </div>
          ))}
        </div>
        <Button className="my-5 w-36">Craft Potion</Button>
        <Button className="w-36">Reset Mixture</Button>
        <Button className="my-5 w-36">Reset Ingredients</Button>
        <Button className="w-36">Add to formulas</Button>
      </div>
      <div className="flex h-screen w-96 justify-end">
        <div className="flex h-screen w-96 flex-col items-center overflow-y-auto bg-secondary p-3">
          <h2 className="py-2 text-2xl">Ingredients</h2>
          <Input
            className="m-2 mr-5"
            aria-label="Filter ingredients"
            placeholder="Search"
          />
          <Select>
            <SelectTrigger className="mb-2 w-[180px]">
              <SelectValue placeholder="All Ingredients" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Order By</SelectLabel>
                <SelectItem value="alphabet">Alphabetical</SelectItem>
                <SelectItem value="rarity">Rarity</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex w-full flex-col items-center overflow-y-auto"></div>
        </div>
      </div>
    </div>
  );
}

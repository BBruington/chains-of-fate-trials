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
import Spinner from "@/components/spinner";

export default function Loading() {
  const emptyMixture = [
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
  ];

  return (
    <div className="flex w-screen justify-between">
      <div />
      <div className="mt-10 flex min-w-fit flex-col">
        <h1 className="mb-7 text-3xl">Drag Ingredients to Make a Potion</h1>
        <div className="grid grid-cols-2 content-center gap-5">
          {emptyMixture.map((mix, index) => (
            <div
              key={index}
              className={`flex h-32 min-w-52 flex-col items-center justify-center space-y-5 whitespace-nowrap rounded-none bg-primary text-xs font-medium text-secondary ${mix.id === "empty" ? "bg-primary/80 text-secondary/80" : ""} ${index === 0 && "rounded-tl-lg"} ${index === 1 && "rounded-tr-lg"} ${index === 2 && "rounded-bl-lg"} ${index === 3 && "rounded-br-lg"}`}
            >
              {mix.name}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center justify-center">
          <Button className="mb-8 h-16 w-80 bg-gradient-to-tr from-purple-600 to-blue-600 text-white hover:animate-pulse hover:from-purple-700 hover:to-blue-700">
            Craft Potion
          </Button>
          <div className="flex space-x-5">
            <Button className="w-36">Reset Mixture</Button>
            <Button className="w-36">Add to Formulas</Button>
          </div>
        </div>
      </div>
      <div className="flex h-screen w-96 justify-end">
        <div className="flex h-screen w-96 flex-col items-center overflow-y-auto border-l border-primary/40 p-2">
          <h2 className="py-2 text-2xl">Ingredients</h2>
          <Input
            className="m-2"
            aria-label="Filter ingredients"
            placeholder="Search"
          />
          <Select>
            <SelectTrigger className="mb-4 w-[180px]">
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
          <div className="flex w-full flex-col items-center space-y-1">
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  );
}

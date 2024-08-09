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
import { Cinzel } from "next/font/google";
import { cn } from "@/lib/utils";

const fontHeader = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function Loading() {
  const emptyMixture = [
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
  ];

  return (
    <div className="relative flex h-full w-full justify-between">
      <div />
      <div className="flex h-screen w-full flex-col items-center">
        <h1
          className={`${fontHeader.className} mb-7 mt-10 animate-pulse text-3xl`}
        >
          Drag Ingredients to Make a Potion
        </h1>
        <div className="flex content-center justify-around space-x-10">
          {emptyMixture.map((mix, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              <div className="vial">
                <div
                  className={cn(mix.id !== "empty" && "liquid")}
                ></div>
              </div>
              <h2 className="mt-3 min-h-[32px] min-w-[89px] max-w-[130px] text-center text-xs">
                {mix.name}
              </h2>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center justify-center">
          <Button className="mb-8 h-16 w-80 bg-gradient-to-tr from-purple-600 to-blue-600 text-white hover:animate-pulse hover:from-purple-700 hover:to-blue-700">
            Craft Potion
          </Button>
          <div className="flex space-x-5">
            <Button className="w-36">Reset Mixture</Button>
          </div>
        </div>
      </div>
      <div className="flex h-screen w-96 justify-end">
        <div className="flex h-screen w-96 flex-col items-center overflow-y-auto border-l border-primary/40 p-2">
          <h2 className={`${fontHeader.className} py-2 text-2xl`}>
            My Ingredients
          </h2>
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

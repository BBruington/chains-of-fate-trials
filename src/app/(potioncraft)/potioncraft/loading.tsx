import Droppable from "@/components/dndkit/dropable";
import { EMPTY_INGREDIENT } from "@/constants";

export default function Loading() {
  const emptyMixture = [
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
    EMPTY_INGREDIENT,
  ];

  return (
    <div className="flex w-screen">
      <div className="flex flex-col">
        <div className="column col-span-2">
          {emptyMixture.map((mix, index) => (
            <div
              key={index}
              className={`inline-flex h-20 w-40 items-center justify-center whitespace-nowrap rounded-none border bg-secondary text-xs font-medium ${mix.id === "empty" ? "bg-secondary/60 text-primary/60" : ""}`}
            >
              {mix.name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-screen w-full justify-end">
        <div className="flex h-screen w-96 flex-col items-center overflow-y-auto bg-secondary p-3"></div>
      </div>
    </div>
  );
}

import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex w-screen justify-between">
      <div />
      <div className="mt-16 flex w-full justify-center">
        <div className="ml-1 flex w-full flex-col">
          <div className="mb-1 flex w-full items-center border-b-2 border-red-800">
            <span className="w-32 text-xl">Name</span>
            <span className="mx-2 w-28 text-xl">Type</span>
            <span className="w-28 text-xl">Rarity</span>
            <span className="ml-3 w-24 text-xl">Buy</span>
          </div>
        </div>
      </div>
      <div className="flex h-full w-96 flex-col items-center space-y-3 overflow-y-auto border border-r-0 border-primary/40 bg-secondary p-3">
        <h2>My Ingredients</h2>
        <Spinner />
      </div>
    </div>
  );
}

import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex w-screen justify-between">
      <div />
      <div className="mt-16 flex w-full justify-center">
        <div className="cursor-normal flex h-60 w-96 flex-col justify-center rounded-lg bg-primary/80 text-center text-secondary">
          <h1 className="p-2 text-2xl">
            Select a Potion to view its properties
          </h1>
        </div>
      </div>
      <div className="flex h-full w-96 flex-col items-center space-y-2 overflow-y-auto border border-r-0 border-primary/40 bg-secondary p-3">
        <h2>Getting Items</h2>
        <Spinner />
      </div>
    </div>
  );
}

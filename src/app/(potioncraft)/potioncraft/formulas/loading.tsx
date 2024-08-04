import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex w-full flex-col items-center justify-center border bg-secondary-foreground/60 text-secondary"></div>
      <div className="flex h-full w-96 flex-col items-center space-y-3 overflow-y-auto bg-secondary p-3">
        <h2 className="w-full border-b text-center text-xl">My Formulas</h2>
        <Input
          className="h-9"
          aria-label="Filter formulas input"
          placeholder="Search"
          disabled
        />
        <Button disabled>Add New Formula</Button>
        <Spinner className="h-10 w-10" />
      </div>
    </div>
  );
}

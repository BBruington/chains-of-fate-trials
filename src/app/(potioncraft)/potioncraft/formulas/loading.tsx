import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex w-full flex-col items-center justify-center border bg-secondary-foreground/60 text-secondary"></div>
      <div className="flex h-full w-96 flex-col items-center space-y-3 overflow-y-auto bg-secondary p-3">
        <Button disabled={true}>Add New Formula</Button>
        <Spinner className="h-10 w-10" />
      </div>
    </div>
  );
}

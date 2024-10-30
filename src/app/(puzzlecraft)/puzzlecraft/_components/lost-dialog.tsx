"use-client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";

export default function LostDialog({
  reset,
  isFailed,
  setIsFailed
}: {
  reset: () => void;
  isFailed: boolean;
  setIsFailed: Dispatch<SetStateAction<boolean>>;
}) {

  return (
    <Dialog
      open={isFailed}
      onOpenChange={(event) => {
        if (!event) {
          reset();
          setIsFailed(false);
        }
      }}
    >
      <DialogContent className="flex flex-col items-center sm:max-w-[425px]">
        <DialogHeader className="w-full">
          <DialogTitle className="text-center">You Lost</DialogTitle>
          <DialogDescription className="p-3 text-center">
            Reach the flag to win the level
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="w-32"
            type="submit"
            onClick={() => {
              reset();
              setIsFailed(false);
            }}
          >
            Retry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

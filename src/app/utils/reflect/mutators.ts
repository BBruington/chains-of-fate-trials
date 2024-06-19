import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import type { WriteTransaction } from "@rocicorp/reflect";

export const mutators = {
  increment,
  handleDragEnd,
};

async function increment(tx: WriteTransaction, delta: number) {
  const value = (await tx.get<number>("count")) ?? 0;
  await tx.set("count", value + delta);
}

async function handleDragEnd(tx: WriteTransaction, id: string | null) {
  (await tx.get<string | null>("dragevent")) ?? null;
  await tx.set("dragevent", id);
}

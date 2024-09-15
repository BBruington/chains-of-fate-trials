import { MetalType } from "@/app/(session)/session/[id]/_types";
import { Button } from "@/components/ui/button";
import { ALL_METALS } from "../../../_constants";

export default function MetalListItem({
  metal,
  addMetal,
}: {
  metal: MetalType;
  addMetal: (newMetal: keyof typeof ALL_METALS) => void;
}) {
  return (
    <>
      <p>{metal.name}</p>
      <p>Hardness: {metal.hiddenValue === "hardness" ? "?" : metal.hardness}</p>
      <p>
        Magic:{" "}
        {metal.hiddenValue === "magicAffinity" ? "?" : metal.magicAffinity}
      </p>
      <p>Purity: {metal.hiddenValue === "purity" ? "?" : metal.purity}</p>
      <Button
        onClick={() => addMetal(metal.name as keyof typeof ALL_METALS)}
        className="h-5"
      >
        add
      </Button>
    </>
  );
}

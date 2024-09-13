import { MetalType } from "@/app/(session)/session/[id]/_types";
import { Button } from "@/components/ui/button";
import { allMetals } from "../../../_constants/earth-constants";

export default function MetalListItem({
  metal,
  addMetal,
}: {
  metal: MetalType;
  addMetal: (newMetal: keyof typeof allMetals) => void;
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
        onClick={() => addMetal(metal.name as keyof typeof allMetals)}
        className="h-5"
      >
        add
      </Button>
    </>
  );
}

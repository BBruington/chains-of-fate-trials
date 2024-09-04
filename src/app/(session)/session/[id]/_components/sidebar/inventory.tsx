import DraggableInvItem from "./draggable-inv-item";
import { useAtom } from "jotai";
import { inventoryItems } from "../../jotaiAtoms";
import { cn } from "@/lib/utils";

function Inventory() {
  const [invItems, setInventoryItem] = useAtom(inventoryItems);
  return (
    <>
      <h2 className="mb-2 flex justify-center text-2xl">Inventory</h2>
      <div className="grid grid-cols-2 justify-items-center gap-4">
        {Object.values(invItems).map((item) => (
          <DraggableInvItem
            key={item.name}
            item={item}
            id={`name`}
            className={cn("h-40 w-40", !item.image && "bg-slate-600")}
          />
        ))}
      </div>
    </>
  );
}

export default Inventory;
import DraggableInvItem from "./draggable-inv-item";
import { useAtom } from "jotai";
import { inventoryItems } from "../../jotaiAtoms";
import { cn } from "@/lib/utils";
import { pusherClient } from "@/lib/pusher";
import { useCallback, useEffect } from "react";

function Inventory({id}: {id: string}) {
  const [invItems, setInvItems] = useAtom(inventoryItems);
  const handleLiveUpdate = useCallback((completedPuzzleGem: "firegem" | "airgem" | "watergem" | "earthgem") => {
    setInvItems(invItems.map(item => {
      if(item.name.toLocaleLowerCase() === completedPuzzleGem) {
        return {
          ...item,
          hidden: false
        }
      }
      return item;
    }));
  }, [invItems, setInvItems]);

  useEffect(() => {
    pusherClient.subscribe(id);

    pusherClient.bind("complete-puzzle", handleLiveUpdate);

    return () => {
      pusherClient.unsubscribe(id);
      pusherClient.unbind("complete-puzzle", handleLiveUpdate);
    };
  }, [id, handleLiveUpdate]);
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

import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { InventoryItemProps } from "../../_types";
type InventoryItemDialogueProps = {
  item: InventoryItemProps;
};
export default function InventoryItemDetails({
  item,
}: InventoryItemDialogueProps) {
  return (
    <div>
      <DialogContent>
        <DialogTitle>{item.name}</DialogTitle>
      </DialogContent>
    </div>
  );
}

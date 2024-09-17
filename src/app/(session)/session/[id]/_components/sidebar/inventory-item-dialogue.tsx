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
        <DialogTitle>{item.label ? item.label : item.name}</DialogTitle>
        <p>{item.description ? item.description : ""}</p>
      </DialogContent>
    </div>
  );
}

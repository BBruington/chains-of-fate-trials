import DraggableInvItem from "./draggable-inv-item";

function Inventory() {

  const draggables = ["DOORKEY", "dinv2", "dinv3", "dinv4"]
  return (
    <>
      <h2 className="flex justify-center text-2xl">Inventory</h2>
      <div className="grid grid-cols-2 justify-items-center gap-4">
        {draggables.map((name) => (
          <DraggableInvItem key={(name)} item={name} id={`name`} className="h-40 w-40 bg-slate-600"/>

        ))}
      </div>
    </>
  );
}

export default Inventory;

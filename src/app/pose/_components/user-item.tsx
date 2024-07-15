import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { User } from "@prisma/client";

type UserItemProps = {
  user: User;
};

export default function UserItem(props: UserItemProps) {
  const { user } = props;
  const { id, name, email } = user;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-blue-200 p-4 rounded shadow-md flex justify-between"
    >
      <h1>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{email}</p>
      </h1>
      <button {...attributes} {...listeners} className="cursor-move">
        drag me
      </button>
    </div>
  );
}

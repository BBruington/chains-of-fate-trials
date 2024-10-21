import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { User } from "@prisma/client";

type UserItemProps = {
  user: User;
};

export default function UserItem(props: UserItemProps) {
  const { user } = props;
  const { id, email } = user;
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
      className="flex justify-between rounded bg-blue-200 p-4 shadow-md"
    >
      <h1>
        {/* <h3 className="text-lg font-semibold">{name}</h3> */}
        <p className="text-gray-600">{email}</p>
      </h1>
      <button {...attributes} {...listeners} className="cursor-move">
        drag me
      </button>
    </div>
  );
}

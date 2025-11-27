import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";

export default function ProductCheckbox({
  user,
  menuItem,
  order,
}: {
  user: string;
  menuItem: Doc<"menu">;
  order: Doc<"orders"> | undefined;
}) {
  const add = useMutation(api.order.add);
  const remove = useMutation(api.order.remove);
  const handleClick = (e: { preventDefault: () => void }) => {
    if (order === undefined) {
      add({ user, menuItem: menuItem._id });
    } else {
      remove({ id: order._id });
    }
    e.preventDefault();
  };
  return (
    <input
      type="checkbox"
      class="food-order-checkbox"
      onClick={handleClick}
      checked={order !== undefined}
    ></input>
  );
}

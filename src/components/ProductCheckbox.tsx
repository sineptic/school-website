import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc, Id } from "../../convex/_generated/dataModel";

export default function ProductCheckbox({
  user,
  menuItem,
  orderId,
}: {
  user: string;
  menuItem: Doc<"menu">;
  orderId: Id<"orders"> | undefined;
}) {
  const add = useMutation(api.order.add);
  const remove = useMutation(api.order.remove);
  const handleClick = (e: { preventDefault: () => void }) => {
    if (orderId === undefined) {
      add({ user, menuItem: menuItem._id });
    } else {
      remove({ id: orderId });
    }
    e.preventDefault();
  };
  return (
    <input
      type="checkbox"
      class="food-order-checkbox"
      onClick={handleClick}
      checked={orderId !== undefined}
    ></input>
  );
}

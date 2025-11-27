import ProductCheckbox from "@/components/ProductCheckbox";
import { Doc } from "../../convex/_generated/dataModel";
import { ProductDescription } from "@/pages/students";

export default function ProductRow({
  user,
  menuItem,
  order,
  detailedDescription,
}: {
  user: string;
  menuItem: Doc<"menu">;
  order: Doc<"orders"> | undefined;
  detailedDescription: boolean;
}) {
  return (
    <tr>
      <td>
        {detailedDescription ? (
          <>
            <button
              class="popover-trigger"
              popovertarget={`${menuItem._id}-detailed-description`}
            >
              {menuItem.name}
            </button>
            <div
              id={`${menuItem._id}-detailed-description`}
              popover
              class="popover-content"
            >
              <button
                class="popover-closing"
                popovertarget={`${menuItem._id}-detailed-description`}
                popovertargetaction="hide"
              >
                x
              </button>
              <div class="product-description popover-main-content">
                <ProductDescription menuItem={menuItem} />
              </div>
            </div>
          </>
        ) : (
          menuItem.name
        )}
      </td>
      <td>{menuItem.mass}г</td>
      <td>{menuItem.price} руб</td>
      <td>
        <ProductCheckbox user={user} menuItem={menuItem} order={order} />
      </td>
    </tr>
  );
}

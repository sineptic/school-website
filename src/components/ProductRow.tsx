import { Doc, Id } from "../../convex/_generated/dataModel";
import ProductCheckbox from "@/components/ProductCheckbox";
import ProductDescription from "@/components/ProductDescription";
import Popover from "./Popover";

export default function ProductRow({
  user,
  menuItem,
  orderId,
  detailedDescription,
}: {
  user: string;
  menuItem: Doc<"menu">;
  orderId: Id<"orders"> | undefined;
  detailedDescription: boolean;
}) {
  return (
    <tr>
      <td>
        {detailedDescription ? (
          <Popover
            trigger={menuItem.name}
            id={`${menuItem._id}-detailed-description`}
            target={
              <div class="popover-main-content product-description">
                <ProductDescription menuItem={menuItem} />
              </div>
            }
          />
        ) : (
          menuItem.name
        )}
      </td>
      <td>{menuItem.mass}г</td>
      <td>{menuItem.price} руб</td>
      <td>
        <ProductCheckbox user={user} menuItem={menuItem} orderId={orderId} />
      </td>
    </tr>
  );
}

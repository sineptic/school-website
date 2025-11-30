import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { dayPretty } from "@/logic";
import ProductRow from "@/components/ProductRow";
import Popover from "@/components/Popover";
import { Doc, Id } from "../../convex/_generated/dataModel";

export function Dashboard2() {
  const menu: Doc<"menu">[][] | undefined = useQuery(api.order.getMenu);
  const allOrders = useQuery(api.order.getAllOrders);

  if (menu === undefined || allOrders === undefined) {
    return "Loading";
  }

  var users = new Map<string, Map<Id<"menu">, Doc<"orders">>>();
  for (const order of allOrders) {
    const node = users.get(order.user);
    if (node === undefined) {
      users.set(order.user, new Map());
    }
    users.get(order.user)!.set(order.menu_item, order);
  }
  const orders = new Array(...users);

  const headers = (
    <>
      <th>User</th>
      {menu.map((_day, index) => (
        <th style={{ padding: "8px" }}>{dayPretty(index + 1)}</th>
      ))}
    </>
  );

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>
        {orders.map(([user, orderedProducts]) => {
          return (
            <tr>
              <td>{user}</td>
              {Array.from({ length: 14 }, (_, dayIndex) => (
                <td>
                  <DayCell
                    user={user}
                    dayIndex={dayIndex}
                    menu={menu}
                    orderedProducts={orderedProducts}
                  />
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function DayCell({
  user,
  dayIndex,
  orderedProducts,
  menu,
}: {
  user: string;
  dayIndex: number;
  orderedProducts: Map<Id<"menu">, Doc<"orders">>;
  menu: Doc<"menu">[][];
}) {
  const total = menu[dayIndex]
    .filter((item) => orderedProducts.has(item._id))
    .reduce((sum, item) => sum + item.price, 0);
  return (
    <Popover
      trigger={total}
      id={`dashboard1-${user}-${dayIndex}`}
      target={
        <div class="popover-main-content">
          <table class="headerless-table">
            <tbody>
              {menu[dayIndex].map((item) => (
                <ProductRow
                  user={user}
                  menuItem={item}
                  order={orderedProducts.get(item._id)}
                  detailedDescription={false}
                />
              ))}
            </tbody>
          </table>
        </div>
      }
    />
  );
}

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { dayPretty } from "@/logic";
import ProductRow from "@/components/ProductRow";
import Popover from "@/components/Popover";

export function Dashboard1() {
  const menu = useQuery(api.order.getMenu);
  const allOrders = useQuery(api.order.getAllOrders);

  if (menu === undefined || allOrders === undefined) {
    return "Loading";
  }

  let users = new Map();
  for (const order of allOrders) {
    const node = users.get(order.user);
    if (node === undefined) {
      users.set(order.user, new Map());
    }
    users.get(order.user)!.set(order.menu_item, order);
  }
  const orders = new Array(...users);
  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          {menu.map((day, index) => (
            <th style={{ padding: "8px" }}>{dayPretty(index + 1)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders.map(([user, menuItems]) => {
          const totalByDays = menu.map((day) =>
            day
              .filter((item) => menuItems.has(item._id))
              .reduce((sum, item) => sum + item.price, 0),
          );
          return (
            <tr>
              <td>{user}</td>
              {totalByDays.map((total, index) => (
                <td>
                  <Popover
                    trigger={total}
                    id={`dashboard1-${user}-${index}`}
                    target={
                      <div class="popover-main-content">
                        <table class="headerless-table">
                          <tbody>
                            {menu[index].map((item) => (
                              <ProductRow
                                user={user}
                                menuItem={item}
                                orderId={menuItems.get(item._id)}
                                detailedDescription={false}
                              />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    }
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

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { dayPretty } from "@/logic";
import ProductRow from "@/components/ProductRow";

export function Dashboard1() {
  const menu = useQuery(api.order.getMenu);
  const allOrders = useQuery(api.order.getAllOrders);

  if (menu === undefined || allOrders === undefined) {
    return "Loading";
  }

  var users = new Map();
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
                  <button
                    class="popover-trigger"
                    popovertarget={`dashboard1-${user}-${index}`}
                  >
                    {total}
                  </button>
                  <div
                    popover
                    id={`dashboard1-${user}-${index}`}
                    class="popover-content"
                  >
                    <button
                      class="popover-closing"
                      popovertarget={`dashboard1-${user}-${index}`}
                      popovertargetaction="hide"
                    >
                      x
                    </button>
                    <div class="product-description popover-main-content">
                      <table class="headerless-table">
                        <tbody>
                          {menu[index].map((item) => (
                            <ProductRow
                              user={user}
                              menuItem={item}
                              order={menuItems.get(item._id)}
                              detailedDescription={false}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

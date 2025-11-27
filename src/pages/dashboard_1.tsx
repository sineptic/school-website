import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { dayPretty } from "@/logic";

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
      users.set(order.user, new Set());
    }
    users.get(order.user)!.add(order.menu_item);
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
                <td>{total}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

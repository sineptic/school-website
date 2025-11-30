import { useQuery } from "convex/react";
import { useEffect } from "preact/hooks";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import { dayPretty } from "@/logic";
import { useUser } from "@/index";
import ProductRow from "@/components/ProductRow";

export function StudentOrderForm() {
  useEffect(() => {
    document.title = "школьное питание";
  });
  const { username } = useUser();
  if (username === null) {
    console.error("user can't be null on routes");
    return;
  }

  const ordersByDay = useQuery(api.order.getMenu);
  const ordered = useQuery(api.order.getOrder, { user: username });

  if (ordersByDay === undefined || ordered === undefined) {
    return "Loading";
  }
  const find_order = (menuItem: Doc<"menu">) =>
    ordered.find((item) => item.menu_item === menuItem._id);
  return (
    <table>
      <colgroup span={3}></colgroup>
      <thead>
        <tr>
          <th>Название</th>
          <th>Вес</th>
          <th>Цена</th>
          <th>Заказ</th>
        </tr>
      </thead>
      <tbody>
        {ordersByDay
          .filter((day) => day.length !== 0)
          .map((day) => {
            let totalCost = 0;
            for (const menuItem of day) {
              if (find_order(menuItem) !== undefined) {
                totalCost += menuItem.price;
              }
            }
            return (
              <>
                <tr>
                  <th colspan={4}>{dayPretty(day[0].day_number)}</th>
                </tr>
                {day.map((menuItem) => {
                  return (
                    <ProductRow
                      user={username}
                      menuItem={menuItem}
                      orderId={find_order(menuItem)?._id}
                      detailedDescription={true}
                    />
                  );
                })}
                <tr>
                  <th colspan={2}>Итог за день</th>
                  <td>{totalCost}</td>
                </tr>
              </>
            );
          })}
      </tbody>
    </table>
  );
}

import { useQuery, useMutation } from "convex/react";
import { useEffect } from "preact/hooks";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import { dayPretty } from "../logic";
import { useUser } from "..";

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
                    <Product
                      user={username}
                      menuItem={menuItem}
                      order={find_order(menuItem)}
                    ></Product>
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
function Product({
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
  const handleClick = (e) => {
    if (order === undefined) {
      add({ user, menuItem: menuItem._id });
    } else {
      remove({ id: order._id });
    }
    e.preventDefault();
  };
  return (
    <tr>
      <td class="hover-group">
        <button
          class="popover-trigger"
          popovertarget={`${menuItem._id}-detailed-description`}
        >
          {menuItem.name}
        </button>
        <div id={`${menuItem._id}-detailed-description`} popover>
          <button
            class="popover-closing"
            popovertarget={`${menuItem._id}-detailed-description`}
            popovertargetaction="hide"
          >
            x
          </button>
          <ProductDescription menuItem={menuItem} />
        </div>
      </td>
      <td>{menuItem.mass}г</td>
      <td>{menuItem.price} руб</td>
      <td>
        <input
          type="checkbox"
          class="food-order-checkbox"
          onClick={handleClick}
          checked={order !== undefined}
        ></input>
      </td>
    </tr>
  );
}

function ProductDescription({ menuItem }: { menuItem: Doc<"menu"> }) {
  return (
    <div class="product-description">
      <em>{menuItem.name}</em>
      <span>
        <b>Состав</b>: {menuItem.contents.join(", ")}
      </span>
      <span>
        <b>Вес</b>: {menuItem.mass}г
      </span>
      <span>
        <b>Белки</b>: {menuItem.proteins}г
      </span>
      <span>
        <b>Жиры</b>: {menuItem.fats}г
      </span>
      <span>
        <b>Углеводы</b>: {menuItem.carbonhydrates}г
      </span>
      <span>
        <b>Ккал</b>: {menuItem.energy_value}
      </span>
    </div>
  );
}

import { render } from "preact";

import "./style.css";
import { useEffect, useMemo } from "preact/hooks";
import {
  ConvexProvider,
  ConvexReactClient,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import { Doc } from "../convex/_generated/dataModel";
import { StrictMode, Suspense } from "preact/compat";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function App() {
  useEffect(() => {
    document.title = "школьное питание";
  });

  return <OrderForm></OrderForm>;
}

function Product({
  menuItem,
  order,
}: {
  menuItem: Doc<"menu">;
  order: Doc<"orders"> | undefined;
}) {
  const add = useMutation(api.order.add);
  const remove = useMutation(api.order.remove);
  const handleClick = () => {
    console.log();
    if (order === undefined) {
      add({ menuItem: menuItem._id });
    } else {
      remove({ id: order._id });
    }
  };
  return (
    <tr>
      <td class="hover-group">
        {menuItem.name}
        <div class="show-on-hover">
          <div class="product-description">
            <span>
              <b>Состав</b>: {menuItem.contents.join(", ")}
            </span>
            <span>
              <b>Белки</b>: {menuItem.proteins}
            </span>
            <span>
              <b>Жиры</b>: {menuItem.fats}
            </span>
            <span>
              <b>Углеводы</b>: {menuItem.carbonhydrates}
            </span>
            <span>
              <b>Ккал</b>: {menuItem.energy_value}
            </span>
          </div>
        </div>
      </td>
      <td>{menuItem.mass}г</td>
      <td>{menuItem.price} руб</td>
      <td>
        <input
          type="checkbox"
          name={menuItem._id}
          id={menuItem._id}
          class="food-order-checkbox"
          onClick={handleClick}
          checked={order !== undefined}
        ></input>
      </td>
    </tr>
  );
}

function OrderForm() {
  const ordersByDay = useQuery(api.order.getMenu);
  const ordered = useQuery(api.order.getOrder);

  if (ordersByDay === undefined || ordered === undefined) {
    return "Loading";
  }

  return (
    <form>
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
              return (
                <>
                  <tr>
                    <th colspan={4}>День {day[0].day_number}</th>
                  </tr>
                  {day.map((menuItem) => {
                    const order = ordered.find(
                      (item) => item.menu_item === menuItem._id,
                    );
                    return (
                      <Product menuItem={menuItem} order={order}></Product>
                    );
                  })}
                </>
              );
            })}
        </tbody>
      </table>
    </form>
  );
}

render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </StrictMode>,
  document.getElementById("app")!,
);

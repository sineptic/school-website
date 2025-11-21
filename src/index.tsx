import { render } from "preact";

import "./style.css";
import { useEffect, useState } from "preact/hooks";
import { ConvexProvider, ConvexReactClient, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function App() {
  useEffect(() => {
    document.title = "школьное питание";
  });

  return <OrderForm></OrderForm>;
}

function OrderForm() {
  const ordersByDay = useQuery(api.order.get);

  return (
    <form action="/order/submit" method="post">
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
            ?.filter((day) => day.length !== 0)
            .map((day) => {
              return (
                <>
                  <tr>
                    <th colspan={4}>День {day[0].day_number}</th>
                  </tr>
                  {day.map((menuItem) => {
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
                          ></input>
                        </td>
                      </tr>
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
  <ConvexProvider client={convex}>
    <App />
  </ConvexProvider>,
  document.getElementById("app"),
);

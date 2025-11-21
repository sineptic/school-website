import { render } from "preact";

import "./style.css";
import { useEffect, useState } from "preact/hooks";

const data = [
  {
    day_number: 1,
    name: "Салат Греческий с брынзой",
    contents: [
      "помидоры",
      "огурцы",
      "перец сладкий",
      "сыр брынза",
      "оливки",
      "салат романо",
    ],
    price: 110,
    mass: 120,
    proteins: 4.6,
    fats: 3.8,
    carbonhydrates: 3.6,
    energy_value: 109.9,
  },
  {
    day_number: 1,
    name: "Салат Фреш",
    contents: ["помидоры", "огурцы", "салат айсберг", "оливки"],
    price: 65,
    mass: 120,
    proteins: 1.2,
    fats: 0.1,
    carbonhydrates: 3.6,
    energy_value: 20.5,
  },
  {
    day_number: 1,
    name: "Салат витаминный",
    contents: [
      "капуста б/к",
      "морковь",
      "яблоки",
      "лук репчатый",
      "сахар",
      "соль",
      "лимонная кислота",
    ],
    price: 50,
    mass: 120,
    proteins: 1.1,
    fats: 15.1,
    carbonhydrates: 10.4,
    energy_value: 183.2,
  },
  {
    day_number: 1,
    name: "Заправка для салата (масло растительное)",
    contents: ["масло растительное"],
    price: 10,
    mass: 10,
    proteins: 0.0,
    fats: 15.0,
    carbonhydrates: 0.0,
    energy_value: 134.8,
  },
  {
    day_number: 1,
    name: "Заправка для салата (соус салатный)",
    contents: ["соус салатный"],
    price: 15,
    mass: 20,
    proteins: 0.4,
    fats: 10.1,
    carbonhydrates: 0.6,
    energy_value: 94.4,
  },
  {
    day_number: 1,
    name: "Суп-пюре овощной с гренками",
    contents: [
      "капуста б/к",
      "картофель",
      "морковь",
      "лук репчатый",
      "молоко",
      "мука пшеничная",
      "масло сливочное",
      "соль",
    ],
    price: 65,
    mass: 200,
    proteins: 1.2,
    fats: 5.9,
    carbonhydrates: 6.4,
    energy_value: 83.4,
  },
  {
    day_number: 1,
    name: "Шашлычки куриные по-азиатски",
    contents: [
      "мясо кур",
      "соевый соус",
      "чеснок",
      "куркума",
      "имбирь",
      "кориандр",
      "молоко кокосовое",
      "соль",
      "масло растительное",
    ],
    price: 195,
    mass: 150,
    proteins: 46.9,
    fats: 38.8,
    carbonhydrates: 1.9,
    energy_value: 542.3,
  },
  {
    day_number: 1,
    name: "Пенне Аррабиато",
    contents: [
      "(пенне,",
      "говядина",
      "помидоры",
      "перец сладкий",
      "лук репчатый",
      "чеснок",
      "томат-паста",
      "сыр",
    ],
    price: 175,
    mass: 220,
    proteins: 26.7,
    fats: 20.5,
    carbonhydrates: 42.4,
    energy_value: 491.1,
  },
  {
    day_number: 1,
    name: "Биточки из трески с зеленым маслом",
    contents: [
      "филе рыбы (треска)",
      "хлеб пшеничный",
      "молоко",
      "яйцо",
      "масло сливочное",
      "мука",
      "сухари панировочные",
      "масло растительное",
      "зелень",
      "соль",
    ],
    price: 159,
    mass: 80,
    proteins: 17.9,
    fats: 12.1,
    carbonhydrates: 16.6,
    energy_value: 247.2,
  },
  {
    day_number: 1,
    name: "Рис с горошком, кукурузой и морковью",
    contents: [
      "крупа рисовая",
      "кукуруза консервированная",
      "горошек консервированный",
      "морковь",
      "масло сливочное",
      "соль",
    ],
    price: 48,
    mass: 150,
    proteins: 3.2,
    fats: 3.3,
    carbonhydrates: 29.4,
    energy_value: 154.8,
  },
  {
    day_number: 1,
    name: "Картофель по-деревенски",
    contents: ["картофель", "масло растительное", "соль"],
    price: 65,
    mass: 100,
    proteins: 2.9,
    fats: 3.6,
    carbonhydrates: 23.6,
    energy_value: 138.6,
  },
  {
    day_number: 1,
    name: "Шаурма с курицей",
    contents: ["лаваш", "курица", "помидоры", "огурцы", "капуста пекинская"],
    price: 125,
    mass: 160,
    proteins: 16.0,
    fats: 7.2,
    carbonhydrates: 39.2,
    energy_value: 285.6,
  },
  {
    day_number: 2,
    name: "Пельмени детские из п/ф промышленного производства с маслом сливочным",
    contents: ["пельмени", "масло сливочное", "соль"],
    price: 120,
    mass: 200,
    proteins: 19.1,
    fats: 30.5,
    carbonhydrates: 40.7,
    energy_value: 425.2,
  },
  {
    day_number: 3,
    name: "Компот из смородины",
    contents: ["смородина б/з", "сахар"],
    price: 40,
    mass: 200,
    proteins: 2.0,
    fats: 0.0,
    carbonhydrates: 22.4,
    energy_value: 97.6,
  },
  {
    day_number: 4,
    name: "Пенне Аррабиато",
    contents: [
      "(пенне,",
      "говядина",
      "помидоры",
      "перец сладкий",
      "лук репчатый",
      "чеснок",
      "томат-паста",
      "сыр",
    ],
    price: 175,
    mass: 220,
    proteins: 26.7,
    fats: 20.5,
    carbonhydrates: 42.4,
    energy_value: 491.1,
  },
  {
    day_number: 5,
    name: "Биточки из трески с зеленым маслом",
    contents: [
      "филе рыбы (треска)",
      "хлеб пшеничный",
      "молоко",
      "яйцо",
      "масло сливочное",
      "мука",
      "сухари панировочные",
      "масло растительное",
      "зелень",
      "соль",
    ],
    price: 159,
    mass: 80,
    proteins: 17.9,
    fats: 12.1,
    carbonhydrates: 16.6,
    energy_value: 247.2,
  },
  {
    day_number: 5,
    name: "Салат Фреш",
    contents: ["помидоры", "огурцы", "салат айсберг", "оливки"],
    price: 65,
    mass: 120,
    proteins: 1.2,
    fats: 0.1,
    carbonhydrates: 3.6,
    energy_value: 20.5,
  },
  {
    day_number: 6,
    name: "Рис с горошком, кукурузой и морковью",
    contents: [
      "крупа рисовая",
      "кукуруза консервированная",
      "горошек консервированный",
      "морковь",
      "масло сливочное",
      "соль",
    ],
    price: 48,
    mass: 150,
    proteins: 3.2,
    fats: 3.3,
    carbonhydrates: 29.4,
    energy_value: 154.8,
  },
  {
    day_number: 8,
    name: "Картофель по-деревенски",
    contents: ["картофель", "масло растительное", "соль"],
    price: 65,
    mass: 100,
    proteins: 2.9,
    fats: 3.6,
    carbonhydrates: 23.6,
    energy_value: 138.6,
  },
];
const menu = await getMenuWithIds();

function App() {
  useEffect(() => {
    document.title = "школьное питание";
  });

  return <OrderForm></OrderForm>;
}

function OrderForm() {
  const [ordersByDay, setOrder] = useState<MenuItem[][]>([]);

  useEffect(() => {
    setOrder(menu);
  }, []);

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
            .filter((day) => day.length !== 0)
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
                            name={menuItem.id}
                            id={menuItem.id}
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

render(<App />, document.getElementById("app"));

async function getMenuWithIds() {
  let res = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];
  for (const menuItem of data) {
    const id = (
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode("hi"))
    ).toString();
    let copy = JSON.parse(JSON.stringify(menuItem));
    copy.id = id;
    res[menuItem.day_number - 1].push(menuItem);
  }
  return res;
}

interface MenuItem {
  id: string;

  day_number: number;
  name: string;
  contents: string[];
  price: number;
  mass: number;
  proteins: number;
  fats: number;
  carbonhydrates: number;
  energy_value: number;
}

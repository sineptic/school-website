import { Doc } from "../../convex/_generated/dataModel";

export default function ProductDescription({
  menuItem,
}: {
  menuItem: Doc<"menu">;
}) {
  return (
    <>
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
    </>
  );
}

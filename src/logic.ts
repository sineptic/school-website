export function dayPretty(day: number) {
  if (!(day >= 1 && day <= 14)) throw "invalid date";

  const names = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];
  const name = names[(day - 1) % 7];

  return `День ${day} ${name}`;
}

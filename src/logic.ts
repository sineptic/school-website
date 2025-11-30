import { ToOptions, useLocation, useNavigate } from "@tanstack/react-router";
import { useUser } from "@/index";

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

  return `День\u00A0${day} ${name}`;
}

export function ProtectedRouteWithAccount({
  children,
}: {
  children: React.ReactNode[];
}) {
  return ProtectedRoute({
    children,
    check: () => {
      const { username } = useUser();
      const location = useLocation();
      if (!username && location.pathname !== "/account") {
        return { to: "/account" };
      }
      return null;
    },
  });
}

function ProtectedRoute({
  children,
  check,
}: {
  children: React.ReactNode[];
  check: () => ToOptions | null;
}) {
  const navigate = useNavigate();
  const res = check();
  if (res !== null) {
    navigate(res);
    return null;
  }
  return children;
}

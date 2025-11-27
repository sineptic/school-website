import { createContext, render } from "preact";

import "./style.css";
import { ConvexProvider, ConvexReactClient, useQuery } from "convex/react";
import { StrictMode, useContext, useState } from "preact/compat";
import { StudentOrderForm } from "./pages/students";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { dayPretty, ProtectedRouteWithAccount } from "./logic";
import { api } from "../convex/_generated/api";
import { Doc } from "../convex/_generated/dataModel";

const convexUrl = "https://adept-jellyfish-321.convex.cloud";
const convexUrlFromEnv = import.meta.env.VITE_CONVEX_URL as string | null;
if (convexUrlFromEnv) {
  if (convexUrl !== convexUrlFromEnv) {
    console.log("convexUrl", convexUrl);
    console.log("convexUrlFromEnv", convexUrlFromEnv);
    throw "dev convex urls are different";
  }
}

const convex = new ConvexReactClient(convexUrl);

type UserContextType = {
  username: string | null;
  setUsername: (username: string | null) => void;
};
const UserContext = createContext<UserContextType | undefined>(undefined);
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

const rootRoute = createRootRoute({
  component: () => {
    return (
      <>
        <ProtectedRouteWithAccount>
          <nav className="p-2 flex gap-2">
            <Link to="/">Home</Link> <Link to="/account">Account</Link>{" "}
            <Link to="/student">Student</Link>{" "}
            <Link to="/dashboard1">Dashboard 1</Link>
          </nav>
          <hr />
          <Outlet />
        </ProtectedRouteWithAccount>
      </>
    );
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return "Hello world";
  },
});

const studentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student",
  component: StudentOrderForm,
});

const accountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: Account,
});

function Account() {
  const { username, setUsername } = useUser();

  return (
    <>
      <label for="username-input">Username</label>
      <input
        type="text"
        id="username-input"
        value={username ? username : ""}
        onInput={(e) => {
          setUsername(e.target.value);
        }}
      ></input>
    </>
  );
}

const dashboard1 = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard1",
  component: () => {
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
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  studentRoute,
  accountRoute,
  dashboard1,
]);

const router = createRouter({ routeTree, basepath: "/school-website/" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;
render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ConvexProvider>
  </StrictMode>,
  rootElement,
);

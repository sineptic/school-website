import { createContext, render } from "preact";

import "./style.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";
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
import { ProtectedRouteWithAccount } from "./logic";

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
            <Link to="/student">Student</Link>
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
  component: function Student() {
    return <StudentOrderForm></StudentOrderForm>;
  },
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  studentRoute,
  accountRoute,
]);

const router = createRouter({ routeTree });

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

import { render } from "preact";

import "./style.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { StrictMode } from "preact/compat";
import { StudentOrderForm } from "./pages/students";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";

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

const rootRoute = createRootRoute({
  component: () => (
    <>
      <nav className="p-2 flex gap-2">
        <Link to="/">Home</Link> <Link to="/student">Student</Link>
      </nav>
      <hr />
      <Outlet />
    </>
  ),
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

const routeTree = rootRoute.addChildren([indexRoute, studentRoute]);

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
      <RouterProvider router={router} />
    </ConvexProvider>
  </StrictMode>,
  rootElement,
);

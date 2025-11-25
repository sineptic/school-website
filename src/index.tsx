import { render } from "preact";

import "./style.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { StrictMode } from "preact/compat";
import { OrderForm } from "./pages/students";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function App() {
  return <OrderForm></OrderForm>;
}

render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </StrictMode>,
  document.getElementById("app")!,
);

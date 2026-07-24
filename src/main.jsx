import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const container = document.getElementById("root");
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production builds are prerendered (scripts/prerender.js), so the container
// already holds server-rendered markup and must be hydrated rather than replaced.
// `vite dev` serves the raw index.html with an empty container, which needs a
// fresh client root instead.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}

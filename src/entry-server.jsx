import { renderToString } from "react-dom/server";
import App from "./App.jsx";

/**
 * Server entry used only by scripts/prerender.js at build time.
 *
 * index.css is deliberately NOT imported here — the client build already emits and
 * links the stylesheet, and importing it again would make the SSR bundle emit a
 * second, unreferenced copy.
 */
export function render() {
  return renderToString(<App />);
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initDb } from "./db/database";
import { applyBrandingToDocument } from "./theme/branding";

applyBrandingToDocument();

initDb()
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((err) => {
    document.getElementById("root")!.innerHTML =
      `<div style="padding:24px;font-family:sans-serif;color:#D2554B">Failed to start database: ${String(err)}</div>`;
    console.error(err);
  });

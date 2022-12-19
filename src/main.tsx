import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ExplorerProvider from "./Providers/ExplorerProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ExplorerProvider>
      <App />
    </ExplorerProvider>
  </React.StrictMode>,
);

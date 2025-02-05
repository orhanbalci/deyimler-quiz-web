import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Helmet } from "react-helmet";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Helmet>
      <title>Atasözleri Ve Deyimler</title>‍
      <meta name="description" content="Atasözleri Ve Deyimler Anlamları" />
    </Helmet>
    <App />
  </StrictMode>,
);

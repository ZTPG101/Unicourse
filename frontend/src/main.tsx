import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PayPalScriptProvider options={{ clientId: "sb" }}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PayPalScriptProvider>
    </BrowserRouter>
  </React.StrictMode>
);

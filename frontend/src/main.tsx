import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "yet-another-react-lightbox/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
     <ScrollToTop />
      <PayPalScriptProvider options={{ clientId: "sb" }}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PayPalScriptProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ clientId: "sb" }}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PayPalScriptProvider>
  </React.StrictMode>,
)

import {
    PayPalButtons,
    usePayPalScriptReducer,
    type PayPalButtonsComponentProps
} from "@paypal/react-paypal-js";
import React from "react";
import type { BillingDetails } from "../services/billing-details.service";
import { OrderService } from "../services/order.service";

interface PayPalButtonProps {
  total: number;
  billingDetails: Omit<BillingDetails, "id"> | null;
  onSuccess: () => void;
  onError: (message: string) => void;
  onProcessing: (isProcessing: boolean) => void;
  billingId: number | null;
  fundingSource?: PayPalButtonsComponentProps["fundingSource"];
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  total,
  onSuccess,
  onError,
  onProcessing,
  billingId,
  fundingSource,
}) => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <>
      {isPending && <div className="spinner" />}
      <PayPalButtons
        style={{ layout: "vertical" }}
        disabled={!billingId || total <= 0}
        forceReRender={[total]}
        fundingSource={fundingSource}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: total.toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (!actions.order) {
            onError("Something went wrong with PayPal.");
            return;
          }
          onProcessing(true);
          try {
            const details = await actions.order.capture();
            console.log("Payment successful", details);
            if (billingId && details.id) {
              await OrderService.placeOrder(billingId, details.id);
              onSuccess();
            } else {
              onError(billingId ? "PayPal order ID not found." : "Billing details are not available.");
            }
          } catch (err: any) {
            onError(err.message || "An error occurred during payment.");
          } finally {
            onProcessing(false);
          }
        }}
        onError={(err: any) => {
          onError(err.message || "An error occurred with the PayPal button.");
        }}
      />
    </>
  );
};

export default PayPalButton;

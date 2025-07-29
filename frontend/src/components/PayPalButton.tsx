import {
    PayPalButtons,
    usePayPalScriptReducer,
    type PayPalButtonsComponentProps
} from "@paypal/react-paypal-js";
import React from "react";

import { OrderService, type CreateOrderDto } from "../services/order.service";

interface PayPalButtonProps {
  total: number;
  onSuccess: () => void;
  onError: (message: string) => void;
  onProcessing?: (isProcessing: boolean) => void;
  billingId: number | null;
  fundingSource?: PayPalButtonsComponentProps["fundingSource"];
  disabled?: boolean;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  total,
  onSuccess,
  onError,
  onProcessing,
  billingId,
  fundingSource,
  disabled = false,
}) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const handleApprove = async (data: any, actions: any) => {
    if (!actions.order) {
      onError("Something went wrong with PayPal actions.");
      return;
    }
    onProcessing?.(true);

    try {
      const details = await actions.order.capture();
      console.log("Payment successful", details);

      if (!billingId) {
          onError("Billing details are not available. Cannot create order.");
          return;
      }
      if (!details.id) {
          onError("Could not get a valid transaction ID from PayPal.");
          return;
      }

      const orderData: CreateOrderDto = {
          billingDetailsId: billingId,
          paypalOrderId: details.id
      };
      await OrderService.createOrder(orderData);
      
      onSuccess();

    } catch (err: any) {
      onError(err.message || "An error occurred while creating the order.");
    } finally {
      onProcessing?.(false);
    }
  };

  return (
    <>
      {isPending && <div className="spinner" />}
      <PayPalButtons
        style={{ layout: "vertical" }}
        disabled={disabled || !billingId || total <= 0}
        forceReRender={[total, billingId, disabled]} // Re-render if any of these change
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
        onApprove={handleApprove}
        onError={(err: any) => {
          onError(err.message || "An error occurred with the PayPal button.");
        }}
      />
    </>
  );
};

export default PayPalButton;

import { FUNDING } from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PayPalButton from "../components/PayPalButton";
import {
  BillingDetailsService,
  type BillingDetails,
} from "../services/billing-details.service";
import { CartService, type Cart as CartType } from "../services/carts.service";
import { useAuth } from "../context/AuthContext";

const breadcrumbs = [{ label: "Home", path: "/" }, { label: "checkout" }];

const Checkout: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const [activePayment, setActivePayment] = useState<"paypal" | "card">(
    "paypal"
  );
  const [cart, setCart] = useState<CartType | null>(null);
  const [billing, setBilling] = useState<Omit<BillingDetails, "id">>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    note: "",
  });
  const [billingId, setBillingId] = useState<number | null>(null);

  // Unified loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for the order placement process
  const [isSavingBilling, setIsSavingBilling] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setError("Please log in to proceed to checkout.");
      setLoading(false);
      return;
    }

    const loadCheckoutData = async () => {
      try {
        const [cartData, billingData] = await Promise.all([
          CartService.getCart(),
          BillingDetailsService.getBillingDetails(),
        ]);

        setCart(cartData);

        if (billingData) {
          setBillingId(billingData.id);
          setBilling({
            firstName: billingData.firstName || "",
            lastName: billingData.lastName || "",
            address: billingData.address || "",
            city: billingData.city || "",
            state: billingData.state || "",
            zip: billingData.zip || "",
            email: billingData.email || "",
            phone: billingData.phone || "",
            note: billingData.note || "",
          });
        } else if (user?.email) {
          setBilling((prev) => ({ ...prev, email: user.email }));
        }
      } catch (err: any) {
        setError(err.message || "Failed to load checkout data.");
      } finally {
        setLoading(false);
      }
    };

    loadCheckoutData();
  }, [isLoggedIn, user]);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBilling((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveBilling = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setOrderError("You must be logged in to save details.");
      return;
    }

    setIsSavingBilling(true);
    setOrderError(null);
    try {
      const savedDetails = billingId
        ? await BillingDetailsService.updateBillingDetails(billing)
        : await BillingDetailsService.createBillingDetails(billing);

      setBillingId(savedDetails.id);
      // Optional: show a success message like "Details Saved!"
    } catch (err: any) {
      setOrderError(err.message || "Failed to save billing details.");
    } finally {
      setIsSavingBilling(false);
    }
  };

  const handleOrderSuccess = () => {
    setOrderSuccess(true);
    setTimeout(() => {
      navigate("/my-course");
    }, 2000);
  };

  const items = cart?.items || [];
  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  if (loading)
    return <div className="text-center p-5">Loading Checkout...</div>;

  return (
    <>
      <PageHeader title="checkout" breadcrumbs={breadcrumbs} />
      <section className="checkout-page">
        <div className="container">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="billing_details">
                <div className="billing_title">
                  <h2>Billing Details</h2>
                  <p>
                    Your payment will be processed by PayPal, but your billing
                    details are required for our records.
                  </p>
                </div>
                <form
                  className="billing_details_form"
                  onSubmit={handleSaveBilling}
                >
                  <div className="row bs-gutter-x-20">
                    <div className="col-xl-6">
                      <div className="billing_input_box">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          required
                          value={billing.firstName}
                          onChange={handleBillingChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="billing_input_box">
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                          required
                          value={billing.lastName}
                          onChange={handleBillingChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="billing_input_box">
                        <input
                          type="text"
                          name="address"
                          placeholder="Address"
                          required
                          value={billing.address}
                          onChange={handleBillingChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="billing_input_box">
                        <input
                          type="text"
                          name="note"
                          placeholder="Appartment, unit, etc. (optional)"
                          value={billing.note}
                          onChange={handleBillingChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="billing_input_box">
                        <input
                          type="text"
                          name="city"
                          placeholder="Town / City"
                          required
                          value={billing.city}
                          onChange={handleBillingChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row bs-gutter-x-20">
                    <div className="col-xl-6">
                      <div className="billing_input_box">
                        <input
                          type="text"
                          name="state"
                          placeholder="State"
                          required
                          value={billing.state}
                          onChange={handleBillingChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="billing_input_box">
                        <input
                          name="zip"
                          type="text"
                          pattern="[0-9]*"
                          placeholder="Zip code"
                          required
                          value={billing.zip}
                          onChange={handleBillingChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="billing_input_box">
                        <input
                          name="email"
                          type="email"
                          placeholder="Email address"
                          required
                          value={billing.email}
                          onChange={handleBillingChange}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="billing_input_box">
                        <input
                          type="tel"
                          name="phone"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          required
                          placeholder="Phone (XXX-XXX-XXXX)"
                          value={billing.phone}
                          onChange={handleBillingChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12 mt-3">
                      <button
                        type="submit"
                        className="thm-btn"
                        disabled={isSavingBilling}
                      >
                        {isSavingBilling
                          ? "Saving..."
                          : billingId
                          ? "Update Billing Details"
                          : "Save Billing Details"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Your order */}
            <div className="col-xl-6 col-lg-6">
              <div className="your_order">
                <h2>Your order</h2>
                <div className="order_table_box">
                  <table className="order_table_detail">
                    <thead className="order_table_head">
                      <tr>
                        <th>Courses</th>
                        <th className="right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.length === 0 ? (
                        <tr>
                          <td colSpan={2} className="text-center">
                            Your cart is empty.
                          </td>
                        </tr>
                      ) : (
                        <>
                          {items.map((item) => (
                            <tr key={item.id}>
                              <td className="pro__title">{item.title}</td>
                              <td className="pro__price">
                                ${item.price?.toFixed(2)} USD
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td className="pro__title">
                              <b>Total</b>
                            </td>
                            <td className="pro__price">
                              <b>${total.toFixed(2)} USD</b>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Payment Section */}
                <div className="checkout__payment">
                  <p className="mt-4">
                    After saving your billing details, you can complete your
                    purchase with PayPal.
                  </p>
                  {/* The PayPalButton is disabled until billing details are saved */}
                  {!billingId && (
                    <div className="alert alert-warning">
                      Please save your billing details before proceeding to
                      payment.
                    </div>
                  )}

                  {/* --- PayPal Button Section --- */}
                  <div
                    className={`checkout__payment__item ${
                      activePayment === "paypal"
                        ? "checkout__payment__item--active"
                        : ""
                    }`}
                  >
                    <h3
                      className="checkout__payment__title"
                      onClick={() => setActivePayment("paypal")}
                    >
                      Pay with PayPal
                    </h3>
                    {activePayment === "paypal" && (
                      <div className="checkout__payment__content">
                        <PayPalButton
                          total={total}
                          billingId={billingId}
                          onSuccess={handleOrderSuccess}
                          onError={(message) => setOrderError(message)}
                          disabled={!billingId || isSavingBilling}
                          fundingSource={FUNDING.PAYPAL}
                        />
                      </div>
                    )}
                  </div>
                   {/* --- Card Button Section --- */}
                   <div
                    className={`checkout__payment__item ${
                      activePayment === "card" ? "checkout__payment__item--active" : ""
                    }`}
                  >
                    <h3
                      className="checkout__payment__title"
                      onClick={() => setActivePayment("card")}
                    >
                      Pay with Credit Card
                    </h3>
                    {activePayment === "card" && (
                      <div className="checkout__payment__content">
                        <PayPalButton
                          total={total}
                          billingId={billingId}
                          onSuccess={handleOrderSuccess}
                          onError={(message) => setOrderError(message)}
                          disabled={!billingId || isSavingBilling}
                          fundingSource={FUNDING.CARD}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {orderError && (
                <div className="alert alert-danger mt-3">{orderError}</div>
              )}
              {orderSuccess && (
                <div className="alert alert-success mt-3">
                  Order placed successfully! You will be redirected shortly.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;

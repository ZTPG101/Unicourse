import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { CartService, type Cart as CartType } from "../services/carts.service";
import {
  BillingDetailsService,
  type BillingDetails,
} from "../services/billing-details.service";
import { OrderService } from "../services/order.service";
import { Link } from "react-router-dom";
const breadcrumbs = [{ label: "Home", path: "/" }, { label: "checkout" }];
const API_BASE_URL = 'http://localhost:3000';

const Checkout: React.FC = () => {
  const [activePayment, setActivePayment] = useState<"bank" | "paypal">("bank");
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [billingId, setBillingId] = useState<number | null>(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    CartService.getCart()
      .then((cart) => {
        setCart(cart);
        setLoading(false);
      })
      .catch((_err) => {
        setError("Failed to load cart.");
        setLoading(false);
      });
    // Fetch billing details (assume GET /billing-details returns array, use first if exists)
    BillingDetailsService.getToken() &&
      fetch(`${API_BASE_URL}/billing-details`, {
        headers: {
          Authorization: `Bearer ${BillingDetailsService.getToken()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setBillingId(data[0].id);
            setBilling({
              firstName: data[0].firstName || "",
              lastName: data[0].lastName || "",
              address: data[0].address || "",
              city: data[0].city || "",
              state: data[0].state || "",
              zip: data[0].zip || "",
              email: data[0].email || "",
              phone: data[0].phone || "",
              note: data[0].note || "",
            });
          }
        });
  }, []);

  const items = cart?.items || [];
  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
  };

  // Place order logic as a separate function
  const placeOrder = async () => {
    setPlacingOrder(true);
    setOrderError(null);
    try {
      let billingDetails;
      if (billingId) {
        billingDetails = await BillingDetailsService.updateBillingDetails(billingId, billing);
      } else {
        billingDetails = await BillingDetailsService.createBillingDetails(billing);
      }
      console.log('Placing order with billingDetailsId:', billingDetails.id);
      await OrderService.placeOrder(billingDetails.id);
      setOrderSuccess(true);
    } catch (err: any) {
      setOrderError(err.message || "Failed to place order.");
      console.error('Order error:', err);
    } finally {
      setPlacingOrder(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    await placeOrder();
  };

  return (
    <>
      <PageHeader title="checkout" breadcrumbs={breadcrumbs} />
      <section className="checkout-page">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="billing_details">
                <div className="billing_title">
                  {/* Only show if not logged in */}
                  {!isLoggedIn && (
                    <p>
                      Returning Customer?{" "}
                      <Link to="/login">Click here to Login</Link>
                    </p>
                  )}
                  <h2>Billing details</h2>
                </div>
                <form
                  className="billing_details_form"
                  onSubmit={handlePlaceOrder}
                >
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="billing_input_box">
                        <div className="select-box">
                          <select className="wide" disabled>
                            <option data-display="Select a country">
                              Select a country
                            </option>
                            <option value="1">Canada</option>
                            <option value="2">England</option>
                            <option value="3">Australia</option>
                            <option value="3">USA</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
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
                          placeholder="Phone"
                          value={billing.phone}
                          onChange={handleBillingChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="checked-box">
                        <input
                          type="checkbox"
                          name="skipper1"
                          id="skipper"
                          defaultChecked
                        />
                        <label htmlFor="skipper">
                          <span></span>Create an account?
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
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
                <div className="checkout__payment">
                  <div
                    className={`checkout__payment__item${
                      activePayment === "bank"
                        ? " checkout__payment__item--active"
                        : ""
                    }`}
                  >
                    <h3
                      className="checkout__payment__title"
                      style={{ cursor: "pointer" }}
                      onClick={() => setActivePayment("bank")}
                    >
                      Direct bank transfer (not implemented yet)
                    </h3>
                    {/* {activePayment === 'bank' && (
                      <div className="checkout__payment__content">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        won't be completed until the funds have cleared.
                      </div>
                    )} */}
                  </div>
                  <div
                    className={`checkout__payment__item${
                      activePayment === "paypal"
                        ? " checkout__payment__item--active"
                        : ""
                    }`}
                  >
                    <h3
                      className="checkout__payment__title"
                      style={{ cursor: "pointer" }}
                      onClick={() => setActivePayment("paypal")}
                    >
                      Paypal payment{" "}
                      <img src="assets/images/shop/paypal-1.jpg" alt="" />
                    </h3>
                    {activePayment === "paypal" && (
                      <div className="checkout__payment__content">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        won't be completed until the funds have cleared.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12 col-lg-12 d-flex justify-content-end">
                  <button
                    className="thm-btn"
                    type="button"
                    disabled={placingOrder}
                    onClick={handlePlaceOrder}
                  >
                    {placingOrder ? "Placing Order..." : "Place your order"}
                  </button>
                </div>
              </div>
              {orderError && (
                <div className="alert alert-danger mt-2">{orderError}</div>
              )}
              {orderSuccess && (
                <div className="alert alert-success mt-2">
                  Order placed successfully!
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

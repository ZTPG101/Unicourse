import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
const breadcrumbs = [{ label: "Home", path: "/" }, { label: "checkout" }];

const Checkout: React.FC = () => {
  const [activePayment, setActivePayment] = useState<'bank' | 'paypal'>('bank');

  return (
    <>
      <PageHeader title="checkout" breadcrumbs={breadcrumbs} />
      <section className="checkout-page">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="billing_details">
                <div className="billing_title">
                  <p>
                    Returning Customer? <span>Click here to Login</span>
                  </p>
                  <h2>Billing details</h2>
                </div>
                <form className="billing_details_form">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="billing_input_box">
                        <div className="select-box">
                          <select className="wide">
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
                          name="first_name"
                          placeholder="First name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="billing_input_box">
                        <input
                          type="text"
                          name="last_name"
                          placeholder="Last name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="billing_input_box">
                        <input
                          type="text"
                          name="Address"
                          placeholder="Address"
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="billing_input_box">
                        <input
                          type="text"
                          name="company_name"
                          placeholder="Appartment, unit, etc. (optional)"
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="billing_input_box">
                        <input
                          type="text"
                          name="Town/City"
                          placeholder="Town / City"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row bs-gutter-x-20">
                    <div className="col-xl-6">
                      <div className="billing_input_box">
                        <input
                          type="text"
                          name="State"
                          placeholder="State"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="billing_input_box">
                        <input
                          name="form_zip"
                          type="text"
                          pattern="[0-9]*"
                          placeholder="Zip code"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="billing_input_box">
                        <input
                          name="email"
                          type="email"
                          placeholder="Email address"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="billing_input_box">
                        <input
                          type="tel"
                          name="form_phone"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          required
                          placeholder="Phone"
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
                        <th>Product</th>
                        <th className="right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="pro__title">Product Name</td>
                        <td className="pro__price">$10.99 USD</td>
                      </tr>
                      <tr>
                        <td className="pro__title">Subtotal</td>
                        <td className="pro__price">$10.99 USD</td>
                      </tr>
                      <tr>
                        <td className="pro__title">Shipping</td>
                        <td className="pro__price">$0.00 USD</td>
                      </tr>
                      <tr>
                        <td className="pro__title">Total</td>
                        <td className="pro__price">$20.98 USD</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="checkout__payment">
                  <div
                    className={`checkout__payment__item${
                      activePayment === 'bank' ? ' checkout__payment__item--active' : ''
                    }`}
                  >
                    <h3
                      className="checkout__payment__title"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActivePayment('bank')}
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
                      activePayment === 'paypal' ? ' checkout__payment__item--active' : ''
                    }`}
                  >
                    <h3
                      className="checkout__payment__title"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActivePayment('paypal')}
                    >
                      Paypal payment{" "}
                      <img src="assets/images/shop/paypal-1.jpg" alt="" />
                    </h3>
                    {activePayment === 'paypal' && (
                      <div className="checkout__payment__content">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        won't be completed until the funds have cleared.
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right d-flex justify-content-end">
                  <a className="thm-btn" href="/">
                    <span className="icon-angles-right"></span> Place your order
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;

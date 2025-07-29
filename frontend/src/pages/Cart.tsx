import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { CartService, type Cart as CartType } from "../services/carts.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const breadcrumbs = [{ label: "Home", path: "/" }, { label: "Cart" }];

const Cart: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const [carts, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn && user) {
      CartService.getCart()
        .then((cartData) => {
          setCart(cartData);
        })
        .catch((err) => {
          console.error("Failed to load cart for logged-in user:", err);
          setError("Could not load your cart. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
    else if (!isLoggedIn) {
      setCart(null);
      setLoading(false);
    }
  }, [isLoggedIn, user]);

  const handleRemove = (courseId: number) => {
    setCart((prev) =>
      prev
        ? { ...prev, items: prev.items.filter((item) => item.id !== courseId) }
        : null
    );
    CartService.removeItem(courseId)
      .then((updatedCart) => setCart(updatedCart))
      .catch(() => {
        setError("Failed to remove item. Please refresh and try again.");
        // Optional: Rollback UI update if needed
      });
  };

  const handleClear = () => {
    setCart((prev) => (prev ? { ...prev, items: [] } : null));
    CartService.clearCart()
      .then((updatedCart) => setCart(updatedCart))
      .catch(() =>
        setError("Failed to clear cart. Please refresh and try again.")
      );
  };

  const handleCheckout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isLoggedIn || !user) {
      const wantsToLogin = window.confirm(
        "You need to be logged in to proceed to checkout. Would you like to \nlog in now?"
      );
      if (wantsToLogin) {
        navigate("/login", { state: { from: "/checkout" } });
      }
    } else {
      navigate("/checkout");
    }
  };

  const items = carts?.items || [];
  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger container mt-4">{error}</div>;
  }

  return (
    <>
      <PageHeader title="Cart" breadcrumbs={breadcrumbs} />
      <section className="cart-page">
        <div className="container">
          <div className="table-responsive">
            <table className="table cart-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center">
                      Your cart is empty.
                    </td>
                  </tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={item.id || idx}>
                      <td>
                        <div className="product-box">
                          <div className="img-box">
                            <img src={item.imageUrl} alt={item.title} />
                          </div>
                          <h3>
                            <a href="#">{item.title}</a>
                          </h3>
                        </div>
                      </td>
                      <td>${item.price?.toFixed(2)}</td>
                      <td>
                        <div
                          className="cross-icon"
                          onClick={() => handleRemove(item.id)}
                        >
                          <i className="fas fa-times"></i>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <form className="default-form cart-cupon__form">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="cart-cupon__input"
                />
                <button className="thm-btn" type="submit">
                  Apply Coupon
                </button>
              </form>
            </div>
            <div className="col-xl-12 col-lg-12">
              <ul className="cart-total list-unstyled">
                <li>
                  <span>Total</span>
                  <span className="cart-total-amount">
                    ${total.toFixed(2)} USD
                  </span>
                </li>
              </ul>

              <div className="cart-page__buttons">
                <div className="cart-page__buttons-1">
                  <a href="/course" className="thm-btn">
                    Browse more
                  </a>
                </div>
                <div className="cart-page__buttons-1">
                  <button
                    className="thm-btn"
                    onClick={handleClear}
                    disabled={items.length === 0}
                  >
                    Clear Cart
                  </button>
                </div>
                <div className="cart-page__buttons-2">
                  <a
                    href="/checkout"
                    className="thm-btn"
                    onClick={handleCheckout}
                  >
                    Checkout
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

export default Cart;

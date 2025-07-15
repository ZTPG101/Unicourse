import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { CartService, type Cart } from "../services/carts.service";

const breadcrumbs = [{ label: "Home", path: "/" }, { label: "Cart" }];

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    CartService.getCart().then(cart => {
      setCart(cart);
      setLoading(false);
    }).catch(_err => {
      setError("Failed to load cart.");
      setLoading(false);
    });
  }, []);

  const handleRemove = (courseId: number) => {
    CartService.removeItem(courseId).then(cart => setCart(cart)).catch(() => setError("Failed to remove item."));
  };

  const handleClear = () => {
    CartService.clearCart().then(cart => setCart(cart)).catch(() => setError("Failed to clear cart."));
  };

  const items = cart?.items || [];
  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

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
                    <td colSpan={3} className="text-center">Your cart is empty.</td>
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
                        <div className="cross-icon" onClick={() => handleRemove(item.id)}>
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
                <input type="text" placeholder="Enter Coupon Code" className="cart-cupon__input" />
                <button className="thm-btn" type="submit">
                  Apply Coupon
                </button>
              </form>
            </div>
            <div className="col-xl-4 col-lg-5">
              <ul className="cart-total list-unstyled">
                <li>
                  <span>Total</span>
                  <span className="cart-total-amount">${total.toFixed(2)} USD</span>
                </li>
              </ul>
              <div className="cart-page__buttons">
                <div className="cart-page__buttons-1">
                  <a className="thm-btn" href="#" onClick={handleClear}>
                    Clear Cart
                  </a>
                </div>
                <div className="cart-page__buttons-2">
                  <a href="#" className="thm-btn">
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

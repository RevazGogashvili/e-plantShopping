// src/CartItem.jsx (or your chosen path)
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Make sure this path is correct
import './CartItem.css'; // Make sure this CSS file exists and is styled

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      // item.cost should be a number from CartSlice
      total += item.cost * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleContinueShoppingClick = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault(); // Prevent default if it's a form button
    alert('Checkout functionality to be added in the future!');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // Remove if quantity becomes 0
    }
  };

  const handleRemoveFromCart = (item) => { // Renamed to avoid conflict
    dispatch(removeItem(item.name));
  };

  const calculateItemTotalCost = (item) => { // Renamed to avoid conflict
    return (item.cost * item.quantity).toFixed(2);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-container cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any plants yet.</p>
        <div className="continue_shopping_btn">
          <button className="get-started-button" onClick={handleContinueShoppingClick}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-total-amount">
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div className="cart-items-list"> {/* Added a wrapper for the list */}
        {cartItems.map(item => (
          <div className="cart-item" key={item.name}> {/* Assuming item.name is unique in cart */}
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Price: ${item.cost.toFixed(2)}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateItemTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemoveFromCart(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-actions"> {/* Wrapper for action buttons */}
        <button className="get-started-button continue-shopping" onClick={handleContinueShoppingClick}>
          Continue Shopping
        </button>
        <button className="get-started-button1 checkout" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
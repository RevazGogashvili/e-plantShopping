import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Assuming CartSlice.js is in the same directory
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items); // Renamed to cartItems for clarity
  const dispatch = useDispatch();

  // 1. Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      // Assuming item.cost is already a number from CartSlice.js
      // If item.cost could still be a string here, you'd parse it.
      // const cost = typeof item.cost === 'string' ? parseFloat(item.cost.replace('$', '')) : item.cost;
      total += item.cost * item.quantity;
    });
    return total.toFixed(2); // Format to 2 decimal places
  };

  // 2. Continue shopping (call prop from parent)
  const handleContinueShoppingClick = (e) => { // Renamed to avoid conflict with prop name
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // 3. Checkout (placeholder)
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // 4. Increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // 5. Decrement quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity is 1, dispatch removeItem to remove the item
      dispatch(removeItem(item.name));
    }
  };

  // 6. Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 7. Calculate total cost for a single item type
  const calculateTotalCost = (item) => {
    // Assuming item.cost is already a number
    // const cost = typeof item.cost === 'string' ? parseFloat(item.cost.replace('$', '')) : item.cost;
    return (item.cost * item.quantity).toFixed(2);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-container cart-empty">
        <h2 style={{ color: 'black' }}>Your Cart is Empty</h2>
        <p>Looks like you haven't added any plants to your cart yet.</p>
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
      <h2 style={{ color: 'black' }} className="cart-total-amount"> {/* Added a class for styling */}
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cartItems.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              {/* Displaying cost per unit, assuming item.cost is already numeric */}
              <div className="cart-item-cost">Price: ${item.cost.toFixed(2)}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {/* The h2 above already displays total cart amount, this div might be redundant or for something else */}
      {/* <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div> */}
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShoppingClick}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
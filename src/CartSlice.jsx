import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // 1. addItem reducer implementation
    addItem: (state, action) => {
      const { name, image, cost, description /* any other product details you want to store */ } = action.payload; // Destructure product details
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity++; // If item exists, increment quantity
      } else {
        // If item does not exist, add it with quantity 1
        // Ensure 'cost' is a number if it's passed as a string like "$15"
        // You might want to parse it here or ensure it's parsed before dispatching
        let numericCost = typeof cost === 'string' ? parseFloat(cost.replace('$', '')) : cost;
        if (isNaN(numericCost)) {
            console.warn(`Invalid cost for item: ${name}. Defaulting cost to 0.`);
            numericCost = 0;
        }

        state.items.push({ name, image, cost: numericCost, description, quantity: 1 });
      }
    },
    // 2. removeItem reducer implementation
    removeItem: (state, action) => {
      // action.payload is expected to be the name of the item to remove
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    // 3. updateQuantity reducer implementation
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Destructure name and new quantity
      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        // Ensure quantity is a positive number. If it's 0 or less, consider removing the item.
        if (quantity > 0) {
            itemToUpdate.quantity = quantity;
        } else {
            // If quantity is 0 or less, remove the item (optional behavior)
            state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
  },
});

// 4. Export action creators and the reducer
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
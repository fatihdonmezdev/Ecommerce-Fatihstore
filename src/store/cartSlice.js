import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const existingCart = localStorage.getItem("cart");
    return existingCart ? JSON.parse(existingCart) : [];
  }
  return [];
};

const calculateSubtotal = (quantity, price) => quantity * price;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.subtotal = calculateSubtotal(
          existingItem.quantity,
          existingItem.price
        );
      } else {
        // If the product is not in the cart, add it with quantity 1
        const newItem = {
          ...action.payload,
          quantity: 1,
          subtotal: action.payload.price,
        };
        state.items.push(newItem);
      }

      // Save the updated cart to local storage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.subtotal = calculateSubtotal(
          existingItem.quantity,
          existingItem.price
        );
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.subtotal = calculateSubtotal(
          existingItem.quantity,
          existingItem.price
        );
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateCart: (state) => {
      const itemsInLocal = loadCartFromLocalStorage();
      state.items = itemsInLocal;
    },
  },
});

export const { updateCart, addToCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;

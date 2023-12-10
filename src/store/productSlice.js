// redux/slices/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/pages/_app";
import { collection, getDocs } from "firebase/firestore";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const productsList = collection(db, "products");
    const products = await getDocs(productsList);
    const filteredProducts = products.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return filteredProducts;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { products: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;

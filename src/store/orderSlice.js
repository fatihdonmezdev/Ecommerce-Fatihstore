import { db } from "@/pages/_app";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const ordersList = collection(db, "orders");
  const orders = await getDocs(ordersList);
  const filteredOrders = orders.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return filteredOrders;
});
const orderSlice = createSlice({
  name: "auth",
  initialState: {
    orders: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default orderSlice.reducer;

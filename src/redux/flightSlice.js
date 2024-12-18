import { createSlice } from "@reduxjs/toolkit";

const flightSlice = createSlice({
  name: "flights",
  initialState: {
    orders: [],
    currentBooking: {
      destination: "",
      flyDate: null,
      returnDate: null,
      children: 0,
      seats: 1,
    },
  },
  reducers: {
    setCurrentBooking: (state, action) => {
      state.currentBooking = {
        ...state.currentBooking, ...action.payload
      };
    },
    addOrder: (state, action) => {
        state.orders.push(action.payload)
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...action.payload };
      }
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
  },
});

export const { setCurrentBooking, addOrder, updateOrder, removeOrder } =
  flightSlice.actions;
export default flightSlice.reducer;

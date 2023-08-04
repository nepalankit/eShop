import { createSlice } from "@reduxjs/toolkit";
//in  other slices we used creat api slice  beacsue they had endpointd dealing with async req. we arenot delaing this with cart so
import { updateCart } from "../utils/cartUtils";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //state  is whatever the current state is and action will include any data inside of payload

      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
  },
});
//So even though we already exported the reducer to put that in the store JS file, any function we create,here we need to export as an action.

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

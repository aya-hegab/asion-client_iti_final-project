import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../apis/config";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const headers = {
  Authorization: `Token ${token}`,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    count: 0,
    items: [],
  },
  reducers: {
    setTotalCount: (state, action) => {
      state.count = state.items.length;
    },
    setWishTotalCount: (state, action) => {
      state.count = state.items.length;
    },
    resetWishTotalCount: (state, action) => {
      state.count = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state) => {
      state.count += 1;
    },
    removeItem: (state) => {
      state.count -= 1;
    },
  },
});

export const {
  setTotalCount,
  setItems,
  addItem,
  removeItem,
  setWishTotalCount,
  resetWishTotalCount,
} = wishlistSlice.actions;

export const fetchWishList = (userID) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/api/wishlist/list/`, {
      headers,
    });
    dispatch(setItems(response.data.wishlist_items));
    dispatch(setTotalCount());
  } catch (error) {
    console.error("Error fetching total count:", error);
  }
};

export default wishlistSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../apis/config";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const headers = {
  Authorization: `Token ${token}`,
};

const totalSlice = createSlice({
  name: "total",
  initialState: {
    count: 0,
    itemsid: [],
    items: [],
  },
  reducers: {
    setTotalCount: (state, action) => {
      state.count = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setCartTotalCount: (state, action) => {
      state.count = state.items.length;
    },
    setItemsid: (state, action) => {
      state.itemsid = action.payload;
    },
    increaseCounter: (state) => {
      state.count += 1;
    },
    decreaseCounter: (state) => {
      state.count -= 1;
    },
    decreaseCounterByAmount: (state, action) => {
      state.count -= action.payload;
    },
    increaseCounterByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const {
  setTotalCount,
  setItemsid,
  setItems,
  increaseCounter,
  decreaseCounter,
  decreaseCounterByAmount,
  increaseCounterByAmount,
  setCartTotalCount,
} = totalSlice.actions;

export const fetchTotalCount = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/api/cart/list/`, { headers });
    // dispatch(setItems(response.data.cart_items));
    // dispatch(setCartTotalCount());
    dispatch(setTotalCount(response.data.total_items_count));
    dispatch(setItemsid(response.data.cart_items.map((item) => item.item)));
    // dispatch(setItems(response.data.cart_items));
    // console.log(response.data.cart_items);
  } catch (error) {
    console.error("Error fetching total count:", error);
  }
};

export default totalSlice.reducer;

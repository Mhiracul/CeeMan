import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

// Action Types
export const VIEW_PRODUCTS_SUCCESS = "VIEW_PRODUCTS_SUCCESS";
export const VIEW_PRODUCTS_FAIL = "VIEW_PRODUCTS_FAIL";
export const VIEW_ONE_PRODUCT_SUCCESS = "VIEW_ONE_PRODUCT_SUCCESS";
export const VIEW_ONE_PRODUCT_FAIL = "VIEW_ONE_PRODUCT_FAIL";

// View all products
export const viewProducts = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("auth"); // Get token from local storage
      console.log(token);

      // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNse…Tk4fQ.eh_k3ILr_bZpK93d9xcE8DPSNomPCel3Tn0E9sOj7SY`;

      // const encodedToken = encodeURIComponent(token.trim());

      const res = await axios.get(
        "https://ceeman-back.onrender.com/api/products/view",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the headers
          },
        }
      );

      dispatch({ type: VIEW_PRODUCTS_SUCCESS, payload: res.data });
      console.log(res.data);
    } catch (error) {
      dispatch({
        type: VIEW_PRODUCTS_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
      console.log(error.message);
    }
  };
};

// View one product by productId
export const viewOneProduct = (productId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token"); // Get token from local storage

      const res = await axios.get(
        `https://ceeman-back.onrender.com/api/product/view/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the headers
          },
        }
      );
      dispatch({ type: VIEW_ONE_PRODUCT_SUCCESS, payload: res.data.product });
    } catch (error) {
      dispatch({
        type: VIEW_ONE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(viewProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(viewProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        // state.error = null;
      })
      .addCase(viewProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;

// export default viewProducts;

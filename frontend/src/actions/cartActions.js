import axios from "axios";

// Action Types
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAIL = "ADD_TO_CART_FAIL";
export const VIEW_CART_SUCCESS = "VIEW_CART_SUCCESS";
export const VIEW_CART_FAIL = "VIEW_CART_FAIL";
export const INCREASE_QUANTITY_SUCCESS = "INCREASE_QUANTITY_SUCCESS";
export const INCREASE_QUANTITY_FAIL = "INCREASE_QUANTITY_FAIL";
export const DECREASE_QUANTITY_SUCCESS = "DECREASE_QUANTITY_SUCCESS";
export const DECREASE_QUANTITY_FAIL = "DECREASE_QUANTITY_FAIL";
export const DELETE_CART_ITEM_SUCCESS = "DELETE_CART_ITEM_SUCCESS";
export const DELETE_CART_ITEM_FAIL = "DELETE_CART_ITEM_FAIL";
export const FETCH_TOTAL_CART_ITEMS_SUCCESS = "FETCH_TOTAL_CART_ITEMS_SUCCESS";
export const FETCH_TOTAL_CART_ITEMS_FAIL = "FETCH_TOTAL_CART_ITEMS_FAIL";

// Add a product to cart
// Add a product to cart
// Add a product to cart
export const addToCart = (productId) => async (dispatch) => {
  const token = localStorage.getItem("auth");

  if (!token) {
    dispatch({
      type: "ADD_TO_CART_FAIL",
      payload: "No authentication token found.",
    });
    return;
  }

  try {
    const response = await axios.post(
      `https://ceeman-back.onrender.com/api/cart/${productId}/add`,
      {}, // Empty object for the body if not needed
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the headers
        },
      }
    );

    console.log("Response from addToCart:", response.data); // Log the response

    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// View cart items
// View cart items
export const viewCart = () => async (dispatch) => {
  const token = localStorage.getItem("auth");

  if (!token) {
    dispatch({
      type: VIEW_CART_FAIL,
      payload: "No authentication token found.",
    });
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      "https://ceeman-back.onrender.com/api/cart/view",
      config
    );

    dispatch({ type: VIEW_CART_SUCCESS, payload: res.data.cartItems });
  } catch (error) {
    dispatch({
      type: VIEW_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Increase quantity of an item in cart
// Increase quantity of an item in cart
export const increaseCartItemQuantity =
  (cartItemId, amount) => async (dispatch) => {
    const token = localStorage.getItem("auth");

    if (!token) {
      dispatch({
        type: INCREASE_QUANTITY_FAIL,
        payload: "No authentication token found.",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `https://ceeman-back.onrender.com/api/cart/${cartItemId}/increase`,
        { amount },
        config
      );

      console.log("Response from increaseCartItemQuantity:", response.data); // Log the response

      dispatch({ type: INCREASE_QUANTITY_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: INCREASE_QUANTITY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Decrease quantity of an item in cart
export const decreaseCartItemQuantity =
  (cartItemId, amount) => async (dispatch) => {
    const token = localStorage.getItem("auth");

    if (!token) {
      dispatch({
        type: DECREASE_QUANTITY_FAIL,
        payload: "No authentication token found.",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `https://ceeman-back.onrender.com/api/cart/${cartItemId}/decrease`,
        { amount },
        config
      );

      console.log("Response from decreaseCartItemQuantity:", response.data); // Log the response

      dispatch({ type: DECREASE_QUANTITY_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: DECREASE_QUANTITY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const deleteCartItem = (cartItemId) => async (dispatch) => {
  const token = localStorage.getItem("auth");

  if (!token) {
    dispatch({
      type: DELETE_CART_ITEM_FAIL,
      payload: "No authentication token found.",
    });
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(
      `https://ceeman-back.onrender.com/api/cart/${cartItemId}/delete`,
      config
    );

    dispatch({ type: DELETE_CART_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: DELETE_CART_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const fetchTotalCartItems = () => async (dispatch) => {
  const token = localStorage.getItem("auth");

  if (!token) {
    dispatch({
      type: FETCH_TOTAL_CART_ITEMS_FAIL,
      payload: "No authentication token found.",
    });
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      "https://ceeman-back.onrender.com/api/cart/items/total_No",
      config
    );

    dispatch({
      type: FETCH_TOTAL_CART_ITEMS_SUCCESS,
      payload: response.data.total,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TOTAL_CART_ITEMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

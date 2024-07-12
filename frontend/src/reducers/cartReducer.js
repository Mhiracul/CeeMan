import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  VIEW_CART_SUCCESS,
  VIEW_CART_FAIL,
  INCREASE_QUANTITY_SUCCESS,
  INCREASE_QUANTITY_FAIL,
  DECREASE_QUANTITY_SUCCESS,
  DECREASE_QUANTITY_FAIL,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAIL,
} from "../actions/cartActions";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        loading: false,
        error: null,
      };
    case ADD_TO_CART_FAIL:
    case VIEW_CART_FAIL:
    case INCREASE_QUANTITY_FAIL:
    case DECREASE_QUANTITY_FAIL:
    case DELETE_CART_ITEM_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case VIEW_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
        error: null,
      };
    case INCREASE_QUANTITY_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.CartItemID === action.payload.addedItems.CartItemID
            ? action.payload.addedItems
            : item
        ),
        loading: false,
        error: null,
      };
    case DECREASE_QUANTITY_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.CartItemID === action.payload.updatedItem.CartItemID
            ? action.payload.updatedItem
            : item
        ),
        loading: false,
        error: null,
      };
    case DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.CartItemID !== action.payload.CartItemID
        ),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default cartReducer;

import { cartTypes } from './cart_types';

export const getNumberCart = () => {
  return {
    type: cartTypes.GET_NUMBER_CART,
  };
};

export const addCart = (payload) => {
  return {
    type: cartTypes.ADD_CART,
    payload,
  };
};

export const increaseQuantity = (payload) => {
  return {
    type: cartTypes.INCREASE_QUANTITY,
    payload,
  };
};

export const decreaseQuantity = (payload) => {
  return {
    type: cartTypes.DECREASE_QUANTITY,
    payload,
  };
};

export function deleteCart(payload) {
  return {
    type: cartTypes.DELETE_CART,
    payload,
  };
}

export const updateCart = (productId, quantity) => ({
  type: 'UPDATE_CART',
  payload: { productId, quantity }
});


export const resetCart  = () => {
  return {
    type: cartTypes.RESET_CART,
  };
};

export const setDocRef = (payload) => {
  return {
    type: cartTypes.SET_DOC_REF,
    payload,
  };
};


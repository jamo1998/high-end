import axios from 'axios';
import { ADD_TO_CART, REMOVE_FROM_CART } from './types';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const product = await (await axios.get(`/api/products/${id}`)).data;

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      stockCount: product.stockCount,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

import { collection, onSnapshot } from 'firebase/firestore';
import { productsTypes } from './products_types';
import { db } from '../../Firebase';

const fetchProductsStart = () => ({
  type: productsTypes.FETCH_ALL_PRODUCT_START,
});

const fetchProductsSuccess = (products) => ({
  type: productsTypes.FETCH_ALL_PRODUCT_SUCCESS,
  payload: products,
});

const fetchProductsFail = (error) => ({
  type: productsTypes.FETCH_ALL_PRODUCT_FAIL,
  payload: error,
});

export function fetchProducts() {
  return async (dispatch) => {
    dispatch(fetchProductsStart());
    const q = collection(db, 'products');
    try {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
        dispatch(fetchProductsSuccess(products));
      });
      return () => unsubscribe();
    } catch (error) {
      dispatch(fetchProductsFail(error));
    }
  };
}


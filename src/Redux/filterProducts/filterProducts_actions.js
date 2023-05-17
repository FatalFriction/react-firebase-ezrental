import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';

import { filterCategoriesTypes } from './filterProducts_types';

const fetchProductsStart = () => ({
  type: filterCategoriesTypes.FETCH_ALL_FILTER_CATEGORIES_START,
});

const fetchProductsSuccess = (products) => ({
  type: filterCategoriesTypes.FETCH_ALL_FILTER_CATEGORIES_SUCCESS,
  payload: products,
});

const fetchProductsFail = (error) => ({
  type: filterCategoriesTypes.FETCH_ALL_FILTER_CATEGORIES_FAIL,
  payload: error,
});

export function fetchCategoriesProducts(category) {
  return async (dispatch) => {
    dispatch(fetchProductsStart());

    const q = query(collection(db, 'products'), where('category', '==', category));
    try {
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map((doc) =>{
        return {
          uid: doc.id,
          ...doc.data()
        }
      });
      dispatch(fetchProductsSuccess(products));
    } catch (error) {
      dispatch(fetchProductsFail(error));
    }
  };
}

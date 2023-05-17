import { db } from '../../Firebase';
import { categoriesTypes } from './categoriesProducts_types';

const fetchProductsStart = () => ({
  type: categoriesTypes.FETCH_ALL_CATEGORIES_START,
});

const fetchProductsSuccess = (products) => ({
  type: categoriesTypes.FETCH_ALL_CATEGORIES_SUCCESS,
  payload: products,
});

const fetchProductsFail = (error) => ({
  type: categoriesTypes.FETCH_ALL_CATEGORIES_FAIL,
  payload: error,
});

export function fetchCategoriesProducts(category) {
  return (dispatch) => {
    dispatch(fetchProductsStart());
    db.collection("products").where("category", "==", category)
      .get()
      .then((querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        dispatch(fetchProductsSuccess(products));
      })
      .catch((error) => {
        dispatch(fetchProductsFail(error));
      });
  };
}

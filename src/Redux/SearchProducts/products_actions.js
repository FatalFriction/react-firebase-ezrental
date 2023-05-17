import Fuse from 'fuse.js';
import { collection, onSnapshot } from 'firebase/firestore';
import { productsTypes } from './products_types';
import { db } from '../../Firebase';

const fetchProductsStart = () => ({
  type: productsTypes.FETCH_ALL_PRODUCT_START,
});

const fetchProductsSuccess = (products, searchQuery) => {
  let SearchProducts = products;

  // Perform search if a search query is provided
  if (searchQuery) {
    // Set up Fuse.js options for searching
    const fuseOptions = {
      keys: ['authenticity', 'availability', 'brand', 'category', 'description', 'img', 'price', 'size', 'title'],
    };

    // Create a new instance of Fuse.js
    const fuse = new Fuse(products, fuseOptions);

    // Search for matching products
    const searchResults = fuse.search(searchQuery).map((result) => result.item);

    // Check if any product has an exact same title match
    const exactMatch = searchResults.find((product) => product.title.toLowerCase() === searchQuery.toLowerCase());

    // Set the search results to exact match only if found, otherwise use the full search results
    SearchProducts = exactMatch ? [exactMatch] : searchResults;
  }

  return {
    type: productsTypes.FETCH_ALL_PRODUCT_SUCCESS,
    payload: SearchProducts,
  };
};

const fetchProductsFail = (error) => ({
  type: productsTypes.FETCH_ALL_PRODUCT_FAIL,
  payload: error,
});

export function fetchProducts(searchQuery) {
  return async (dispatch) => {
    dispatch(fetchProductsStart());
    const q = collection(db, 'products');
    try {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
        dispatch(fetchProductsSuccess(products, searchQuery));
      });
      return () => unsubscribe();
    } catch (error) {
      dispatch(fetchProductsFail(error));
    }
  };
}

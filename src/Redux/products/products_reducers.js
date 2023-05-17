import { productsTypes } from './products_types';

const initProduct = {
  products: [],
  loading: false,
  error: null,
};

function productsReducer(state = initProduct, { type, payload }) {
  switch (type) {
    case productsTypes.FETCH_ALL_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };

    case productsTypes.FETCH_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload,
      };

    case productsTypes.FETCH_ALL_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}

export default productsReducer;

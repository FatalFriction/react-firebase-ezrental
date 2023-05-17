import { productsTypes } from './products_types';

const initProduct = {
  products: [],
  typing: false,
  error: null,
};

function sproductsReducer(state = initProduct, { type, payload }) {
  switch (type) {
    case productsTypes.FETCH_ALL_PRODUCT_START:
      return {
        ...state,
        typing: true,
      };

    case productsTypes.FETCH_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        typing: false,
        products: payload,
      };

    case productsTypes.FETCH_ALL_PRODUCT_FAIL:
      return {
        ...state,
        typing: false,
        error: payload,
      };

    default:
      return state;
  }
}

export default sproductsReducer;

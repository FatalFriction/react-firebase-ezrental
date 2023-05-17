import { categoriesTypes } from './categoriesProducts_types';

const initProduct = {
  categoriesproducts: [],
  loading: false,
  error: null,
};

function categoriesProductsReducer(state = initProduct, { type, payload }) {
  switch (type) {
    case categoriesTypes.FETCH_ALL_CATEGORIES_START:
      return {
        ...state,
        loading: true,
      };

    case categoriesTypes.FETCH_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categoriesproducts: payload,
      };

    case categoriesTypes.FETCH_ALL_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}

export default categoriesProductsReducer;

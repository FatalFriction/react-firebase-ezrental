import { filterCategoriesTypes } from './filterProducts_types';

const initProduct = {
  filterInput: 'Anime/Manga',
  filterCategoriesproducts: {
    products: [],
  },
  loading: false,
  error: null,
};

function filterCategoriesReducer(state = initProduct, { type, payload }) {
  switch (type) {
    case filterCategoriesTypes.FETCH_ALL_FILTER_CATEGORIES_START:
      return {
        ...state,
        loading: true,
      };

    case filterCategoriesTypes.FETCH_ALL_FILTER_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        filterCategoriesproducts: { products: payload },
      };

    case filterCategoriesTypes.FETCH_ALL_FILTER_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}

export default filterCategoriesReducer;

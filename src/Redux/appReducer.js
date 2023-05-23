import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from './products/products_reducers';
import cartReducer from './cart/cart_reducers';
import userReducer from './userAuth/userAuth_reducers';
import categoriesProductsReducer from './categoriesProducts/categoriesProducts_reducers';
import filterCategoriesReducer from './filterProducts/filterProducts_reducers';
import sproductsReducer from './SearchProducts/products_reducers';
import { cartTypes } from './cart/cart_types';

const persistConfig = {
  key: 'tester',
  storage,
  whitelist: ['cart'], // Specify the reducer(s) to persist, in this case, 'cart'
};

const appReducers = combineReducers({
  allProducts: productsReducer,
  cart: cartReducer,
  userAuth: userReducer,
  categoriesproducts: categoriesProductsReducer,
  filterproducts: filterCategoriesReducer,
  sproductsReducer: sproductsReducer,
});

const rootReducer = (state, action) => {
  // Handle RESET_CART action to clear the persisted cart state
  if (action.type === cartTypes.RESET_CART) {
    storage.removeItem('persist:tester'); // Remove the persisted state from storage
    state = undefined; // Reset the state to initial values
  }

  return appReducers(state, action);
};

export default persistReducer(persistConfig, rootReducer);

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from './products/products_reducers';
import cartReducer from './cart/cart_reducers';
import userReducer from './userAuth/userAuth_reducers';
import categoriesProductsReducer from './categoriesProducts/categoriesProducts_reducers';
import filterCategoriesReducer from './filterProducts/filterProducts_reducers';
import sproductsReducer from './SearchProducts/products_reducers';

const persistConfig = {
  key: 'tester',
  storage,
  whitelist: ['cart'],
};

const appReducers = combineReducers({
  allProducts: productsReducer,
  cart: cartReducer,
  userAuth: userReducer,
  categoriesproducts: categoriesProductsReducer,
  filterproducts: filterCategoriesReducer,
  sproductsReducer: sproductsReducer,
});

export default persistReducer(persistConfig, appReducers);

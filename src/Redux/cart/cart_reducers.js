import { cartTypes } from './cart_types';

const initProduct = {
  numberCart: 0,
  Carts: [],
};

function cartReducer(state = initProduct, action) {
  switch (action.type) {
    case cartTypes.GET_NUMBER_CART:
      return {
        ...state,
      };

    case cartTypes.ADD_CART:
      let isExist = false;
      const newCarts = state.Carts.map((cart) => {
        if (cart.id === action.payload.uid) {
          isExist = true;
          cart.quantity += 1;
        }
        return cart;
      });
      if (!isExist) {
        let cart = {
          id: action.payload.uid,
          quantity: 1, // Initialize quantity to 1
          name: action.payload.title,
          image: action.payload.img,
          price: +action.payload.price,
          size: action.payload.size
        };
        newCarts.push(cart);
      }
      return {
        ...state,
        numberCart: state.numberCart + 1,
        Carts: newCarts
      };

    case cartTypes.INCREASE_QUANTITY:
      state.numberCart++;
      state.Carts[action.payload].quantity += 1;
      return {
        ...state,
      };

    case cartTypes.DECREASE_QUANTITY:
      let quantity = state.Carts[action.payload].quantity;
      if (quantity > 1) {
        state.numberCart--;
        state.Carts[action.payload].quantity -= 1;
      }
      return {
        ...state,
      };

    case cartTypes.DELETE_CART:
      let quantity_ = state.Carts[action.payload].quantity;
      return {
        ...state,
        numberCart: state.numberCart - quantity_,
        Carts: state.Carts.filter((item) => {
          return item.id !== state.Carts[action.payload].id;
        }),
      };
    
      case 'UPDATE_CART':
        const { productId, newQuantity } = action.payload;
        const updatedCart = state.Carts.map(cart => {
          if (cart.id === productId) {
            return { ...cart, quantity: +newQuantity }; // convert newQuantity to a number
          }
          return cart;
        });
        return {
          ...state,
          Carts: updatedCart
        };
      

    case cartTypes.RESET_CART:
      return initProduct;
    
    default:
      return state;
  }
}

export default cartReducer;

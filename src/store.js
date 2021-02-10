import React, {useState, useContext, useReducer} from 'react'
import axios from 'axios'

// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the store
export const initialState ={
  cart: [],
  items: [],
  currentItemIndex: null
}

// just like the todo app, define each action we want to do on the
// data we defined above
const ADD_CART = "ADD_CART";
const REMOVE_CART = "REMOVE_CART";
const EMPTY_CART = "EMPTY_CART";
const LOAD_ITEMS = "LOAD_ITEMS";
const SELECT_ITEM = "SELECT_ITEM";

// define the matching reducer function
export function ecomReducer(state, action){
  switch(action.type){
    case ADD_CART:
      return {...state, cart:[...state.cart, action.payload.item]};
      
    case REMOVE_CART:
      let cart = state.filter((_item, i) => action.payload.cartIttemIndex !== i);
      return {...state, cart};

    case EMPTY_CART:
      return {...state, cart:[]};

    case LOAD_ITEMS:
      return {...state, items: action.payload.items};

    case SELECT_ITEM:
      const currentItemIndex = action.payload.itemIndex;
      return {...state, currentItemIndex};

    default:
      return state;
  }
}

// The following action-generating functions are commonly referred to
// as "action creators". They accept any input relevant to the action,
// and return an object that represents that action, which is typically
// passed to the dispatch function. Actions always contain a type attribute
// used to identify the action and tell the reducer what logic to run.
export function addCartAction(item) {
  return {
    type: ADD_CART,
    payload: {
      item
    }
  };
}

export function removeCartAction(cartItemIndex) {
  return {
    type: REMOVE_CART,
    payload: {
      cartItemIndex
    }
  };
}

export function emptyCartAction() {
  return {
    type: EMPTY_CART
  };
}

export function loadItemsAction(items) {
  return {
    type: LOAD_ITEMS,
    payload: {
      items
    }
  };
}
export function selectItemAction(itemIndex) {
  return {
    type: SELECT_ITEM,
    payload: {
      itemIndex
    }
  };
}

/****************************
 ****************************
 ***  Provider Code
 ****************************
 **************************** 
 */

 // In this section we extract out the provider HOC

 // export the whole context
export const EcomContext = React.createContext(null);

// create the provider to use below
const {Provider} = EcomContext;


// export a provider HOC that contains the initalized reducer
// pass the reducer as context to the children
// any child component will be able to alter the state of the app
export function EcomProvider({children}) {

  // create the dispatch function in one place and put in into context
  // where it will be accessible to all of the children
  const [store, dispatch] = useReducer(ecomReducer, initialState);
  
  // surround the children elements with
  // the context provider we created above
  return (<Provider value={{store, dispatch}}>
      {children}
    </Provider>)
}

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *        Requests
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */

// In this section we extract out the
// code that makes requests to the backend
//
// these functions must be passed the dispatch from the current context

// place the hard coded backend URL in this file only
const BACKEND_URL = 'http://localhost:3004';

export function loadItems(dispatch){
  axios.get(BACKEND_URL+'/items').then((result) => {
    dispatch(loadItemsAction(result.data.items));
  });
}

export function createOrder(dispatch, order){
  return new Promise((resolve, reject) => {
    axios.post(BACKEND_URL+'/orders', order).then((result) => {
      dispatch(emptyCartAction());
      resolve(result.data.order.id);
    });
  });
}
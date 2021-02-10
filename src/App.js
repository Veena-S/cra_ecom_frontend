import './App.css';

import React, { useState } from 'react';
import axios from 'axios';

import {eComContext} from './components/eComContext.js'

import Cart from './components/Cart.jsx';
import Items from './components/Items.jsx';
import ItemDetail from './components/ItemDetail.jsx';

const BACKEND_URL = 'http://localhost:3004';

export default function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedItemIndex, setSelectedItem] = useState();

  const addToCart = (item, quantity) => {
    const cartItem = { quantity, ...item };
    setCart([cartItem, ...cart]);
  };

  const emptyCart = () => {
    setCart([]);
  };

  const setItemDetail = (itemIndex) => {
    setSelectedItem(itemIndex);
  };

  const getItems = () => {
    axios.get(BACKEND_URL+'/items').then((result) => {
      console.log(result);
      setItems(result.data.items);
    });
  };

  const eComCurrContext = {addToCart, emptyCart, setItemDetail, getItems};

  const selectedItem = items[selectedItemIndex];

  return (
    <div className="container">
      <eComContext.Provider value={eComCurrContext}>
        <div className="row">
          <h1 className="page-title">Wow Shopping!</h1>
          <Items items={items}  />
          {items.length === 0 && (
            <button type="button" onClick={getItems}>
              Get Items
            </button>
          )}
          <ItemDetail item={selectedItem}  />
          <Cart items={cart}  />
        </div>
      </eComContext.Provider>
    </div>
  );
}

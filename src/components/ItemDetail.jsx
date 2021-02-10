import React, { useState, useContext } from "react";
// import {eComContext} from './eComContext.js'
import {addCartAction, EcomContext} from '../store.js'

export default function ItemDetail() {
  const [quantity, setQuantity] = useState(1);
  // const eComCurrContext = useContext(eComContext)
  const {store, dispatch} = useContext(EcomContext);
  const {items, currentItemIndex} = store;
  const item = items[currentItemIndex];

  if (!item) {
    return <div></div>;
  }

  const handleSelectChange = (event) => {
    setQuantity(event.target.value);
  };

  const detailAddCart = () => {
    // eComCurrContext.addToCart(item, quantity);
    // Reducer
    dispatch(addCartAction(item, quantity));
  };

  return (
    <div className="col-sm">
      <div className="item-detail">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>
          <select
            className="item-quantity"
            value={quantity}
            onChange={handleSelectChange}
          >
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <option value={index + 1}>{index + 1}</option>
              ))}
          </select>
          <button type="button" onClick={detailAddCart}>
            Add To Cart
          </button>
        </p>
      </div>
    </div>
  );
}

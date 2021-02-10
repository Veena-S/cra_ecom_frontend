import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import {eComContext} from './eComContext.js'
import {/*removeCartAction, emptyCartAction,*/ EcomContext, createOrder} from '../store.js'

export default function Cart() {
  const [orderId, setOrderId] = useState(null);
  //const eComCurrContext = useContext(eComContext)

  // initialize the store from the context provider
  const {store, dispatch} = useContext(EcomContext);
  // the cart context state data is defined in the initial state and the reducer
  // rename cart in this context - it's items
  const {cart:items} = store;

  if (items.length === 0) {
    if (orderId) {
      return (
        <div className="col-sm">
          <div className="cart">
            <h2>Thank You for your order 😄</h2>
            <h4>
              your order id is:
              {orderId}
            </h4>
          </div>
        </div>
      );
    }
    return <div />;
  }

  const calculateTotals = (items) => {
    const subTotal = items.reduce(
      (acc, item) => Number(acc) + Number(item.price),
      0,
    );

    const gst = subTotal * 0.07;

    const total = subTotal + gst;

    return { subTotal, gst, total };
  };

  const handleOrderClick = () => {
    const { total } = calculateTotals(items);
    const order = { total, items };
    // axios.post('/orders', order).then((result) => {
    //   setOrderId(result.data.order.id);
    //   eComCurrContext.emptyCart();
    //   console.log(result);
    // });

    // when the user selects an item, dispatch the event and set the
    // data. this will trigger a rerender b/c the data is in Context

    // this function returns a promise so that we can set the state
    // inside this component when the request is done and
    // we have the databse id of the order.
    createOrder( dispatch, order ).then((orderId)=>{
      setOrderId(orderId);
    });
  };

  const { subTotal, gst, total } = calculateTotals(items);

  return (
    <div className="col-sm">
      <div className="cart">
        <h2>Cart</h2>
        {items.map((item) => (
          <div key={item.id}>
            {item.quantity}
            |
            {item.name}
            $
            {item.price}
          </div>
        ))}
        <div>
          <h4>
            Sub Total: $
            {subTotal}
          </h4>
          <h4>
            GST: $
            {gst.toFixed(2)}
          </h4>
          <h2>
            Total: $
            {total.toFixed(2)}
          </h2>
        </div>
        <div>
          <button type="button" onClick={handleOrderClick}>Create Order</button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useContext } from "react";
// import {eComContext} from './eComContext.js'

// import all the appropriate store functions
import {
  //loadItemsAction,
  selectItemAction,
  EcomContext,
  loadItems
} from "../store";

export default function Items() {
  // initialize the store from the context provider
  const {store, dispatch} = useContext(EcomContext);

  // the items context state data is defined in the initial state and the reducer
  const {items} = store;

  const [selectedItemIndex, setSelectedItemIndex] = useState();
  // const eComCurrContext = useContext(eComContext)

  // const setItemSelected = (item, index) => {
  //   eComCurrContext.setItemDetail(index);
  //   setSelectedItemIndex(index);
  // };

  // when the user selects an item, dispatch the event and set the
  // data. this will trigger a rerender b/c the data is in Context
  const setItemSelected = (item, index) => {
    dispatch(selectItemAction(index));
    setSelectedItemIndex(index);
  };

  return (
    <div className="col-sm">
      <div className="items">
        {items.length === 0 && (
          <button type="button" onClick={() => loadItems(dispatch) }>
            Get Items
          </button>
        )}
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={index === selectedItemIndex ? "item selected" : "item"}
            onClick={() => setItemSelected(item, index)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

import React, { useState, useContext } from "react";
import {eComContext} from './eComContext.js'

export default function Items({ items }) {
  const [selectedItemIndex, setSelectedItemIndex] = useState();
  const eComCurrContext = useContext(eComContext)

  const setItemSelected = (item, index) => {
    eComCurrContext.setItemDetail(index);
    setSelectedItemIndex(index);
  };

  return (
    <div className="col-sm">
      <div className="items">
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

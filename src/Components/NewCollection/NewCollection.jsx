import React from "react";
import "./NewCollection.css";
import new_collecion from "../Assets/new_collections.js";
import Item from "../Item/Item";
const NewCollection = () => {
  return (
    <div className="new-collections">
      <h1>NEW COLLECIONS</h1>
      <hr />
      <div className="collecions">
        {new_collecion.map((item, i) => {
          return (
            <Item
              key={i}
              item={item.key}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollection;

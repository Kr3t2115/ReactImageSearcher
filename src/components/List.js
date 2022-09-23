import React from "react";
import "./List.css";

export default function List({ data }) {
  if (data.length === 0) {
    return <h1>No results</h1>;
  } else {
    return (
      <div className="List-main">
        {data.map((e) => {
          return (
            <div className="container">
              <img className="image" src={e.image} alt={e.alt}></img>
            </div>
          );
        })}
      </div>
    );
  }
}

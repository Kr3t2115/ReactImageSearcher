import React from "react";
import "./List.css";

export default function List({ data }) {
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

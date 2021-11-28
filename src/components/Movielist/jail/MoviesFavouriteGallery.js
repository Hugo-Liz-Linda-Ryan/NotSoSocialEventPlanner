import React from "react";

const MovieItemHTMLFav = (props) => {

  return (
    <li>
      <div id="pooping" className="product">
        <img src={props.url} alt={props.description}/>
        <div className="content">
          <h3>{props.name}</h3>
          <p className="description">{props.description}</p>
          <p className="price">{props.price}</p>
        </div>
      </div>
    </li>
  );
};

export default MovieItemHTMLFav;

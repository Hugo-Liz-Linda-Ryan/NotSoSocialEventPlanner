import React, { Component, } from "react";
import { MovieSideUL } from "./MovieSideUlItems";
import classes from "./MovieSideUl.module.css"

class MovieSideUlNav extends Component {
  render() {

    return (

      <nav className={classes.nav}>
        <ul>
          {MovieSideUL.map((item, index) => {
            return (
              <li className="poop" key={index}>
                <a className={item.cName} href={item.url}>
                  {item.Navtitle}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default MovieSideUlNav;

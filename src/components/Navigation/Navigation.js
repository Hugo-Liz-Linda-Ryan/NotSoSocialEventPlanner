import React, { Component, } from "react";
import { NavItems } from "./NavigationItems";
import classes from "./Navigation.module.css";
import Castle from "./CastleFunction";

class Navigation extends Component {
  render() {

    return (

      <nav className={classes.nav}>
        <Castle/>
        <ul>
          
          {NavItems.map((item, index) => {
            return (
              <li className={classes.liststyling} key={index}>
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

export default Navigation;

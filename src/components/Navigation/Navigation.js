import React, { Component } from "react";
import { NavItems } from "./NavigationItems";
import classes from "./Navigation.module.css";
import Castle from "./CastleFunction";
import "./ThemeMenu.css";

class Navigation extends Component {
  state = {
    showBox: false,
  };

  color = {
    font: false,
  };

  handleBoxToggle = () => this.setState({ showBox: !this.state.showBox });

  render() {
    return (
      <nav className={classes.nav}>
        <div className={`themeMenu${this.state.showBox ? " Open" : " closed"}`}>
          <Castle />
        </div>
        <div className={`fireonthedancefloor${this.state.showBox ? " Open" : " closed"}`} onClick={this.handleBoxToggle}/>
        <button className={classes.themeClick} onClick={this.handleBoxToggle}>
        <i className={`${this.state.showBox ? "fas fa-bahai" : "fas fa-times"}`}></i>
        </button>
        <ul>
          {NavItems.map((item, index) => {
            return (
              <li className={classes.liststyling} href={item.url} key={index}>
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

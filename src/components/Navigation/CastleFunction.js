import React, { Component } from "react";
import classes from "./Navigation.module.css";

let htmlElement = document.documentElement;

class Castle extends Component {
  
DarkMode() {
    htmlElement.setAttribute("data-theme", "dark");
    }

Default() {
    htmlElement.setAttribute("data-theme", "light");
    }

Colourful() {
  htmlElement.setAttribute("data-theme", "colorful");
  
    }

  render() {
    return (
      <div className={classes.themeToggle}>
        <button onClick={this.Default}>Default Theme</button>
        <button onClick={this.DarkMode}>DarkMode</button>
        <button onClick={this.Colourful}>Colourful Theme</button>
      </div> 

    );
  }
}
export default Castle;

import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import classes from "./Header.module.css"

function Lower_header() {
  return (
    <div>
      <div className={classes.lower_container}>
        <ul>
          <li>
            <AiOutlineMenu />
            <p>A11</p>
          </li>
          <li>Today's Deals</li>
          <li>Costumer Service</li>
          <li>Registry</li>
          <li>Gift Cards</li>
          <li>Sell</li>
        </ul>
      </div>
    </div>
  );
}

export default Lower_header;

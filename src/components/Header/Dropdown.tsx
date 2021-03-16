import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { store } from "../../redux/store";
import { AdminMenuItems } from "./AdminMenuItems";
import { CompanyMenuItems } from "./CompanyMenuItems";
import { CustomerMenuItems } from "./CustomerMenuItems";
import "./Dropdown.css";

function Dropdown() {
  //? useState hook: returns a pair, the current state value and a function, that lets you change the state
  // Used for whether to showcase dropdown menu or not.
  const [click, setClick] = useState(false);
  // Set the state to the opposite (like a toggle)
  const handleClick = () => setClick(!click);

  return (
    <div>
      <ul
        onClick={handleClick}
        /* Change the way the menu is shown (Whether showcase or not) (different CSS) */
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {/* Map through the MenuItems array. */}
        {(sessionStorage.getItem("userType") === "ADMIN" &&
        store.getState().isLoggedIn
          ? AdminMenuItems
          : sessionStorage.getItem("userType") === "COMPANY" &&
            store.getState().isLoggedIn
          ? CompanyMenuItems
          : CustomerMenuItems
        ).map((item, index) => {
          return (
            <li key={index}>
              <NavLink
                className={item.className}
                to={item.path}
                // Closes the dropdown menu after clicking.
                onClick={() => setClick(false)}
              >
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dropdown;

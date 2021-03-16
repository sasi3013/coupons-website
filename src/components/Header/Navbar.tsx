import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RegisterButton } from "./RegisterButton";
import { LoginButton } from "./LoginButton";
import Dropdown from "./Dropdown";
import "./Navbar.css";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import { LogOutButton } from "./LogOutButton";
import { CustomerMenuItems } from "./CustomerMenuItems";
import { CompanyMenuItems } from "./CompanyMenuItems";
import { AdminMenuItems } from "./AdminMenuItems";

function Navbar() {
  //? useState hook: returns a pair, the current state value and a function, that lets you change the state
  // Used for whether to showcase menu or not (on a narrow screen using the menu button).
  const [click, setClick] = useState(false);
  // Used for whether to showcase Dropdown menu or not.
  const [dropdown, setDropdown] = useState(false);

  // Set the state to the opposite (like a toggle)
  const handleMenuIconClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Update the store when clicking dark/light buttons.
  // Uses the value of isDarkMode in the Layout.
  const switchToDarkMode = () =>
    store.dispatch({ type: ActionType.SwitchToDarkMode });
  const switchToLightMode = () =>
    store.dispatch({ type: ActionType.SwitchToLightMode });

  // Both functions make the dropdown menu dissapear on narrow screen. Showcase ONLY on wide screen when mouse pointer on it.
  const onMouseEnter = () => {
    if (window.innerWidth < 1080) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 1080) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  // Updating the menu that should be displayed. Use the store in order to rerender with every window size change.
  const setMenu = () => {
    if (window.innerWidth < 1080) {
      store.dispatch({ type: ActionType.SetIsMobile, payload: true });
    } else {
      store.dispatch({ type: ActionType.SetIsMobile, payload: false });
    }
  };

  // Will cause re render every time the window size change.
  window.addEventListener("resize", setMenu);

  return (
    <div>
      <nav className="navbar">
        <NavLink to="/home" exact className="navbar-logo">
          <i className="fas fa-tags" /> Sas Coupons
        </NavLink>
        <div className="light-dark-toggle">
          <button className="dark-side-button" onClick={switchToDarkMode}>
            Dark side
          </button>
          <button className="light-side-button" onClick={switchToLightMode}>
            Light side
          </button>
        </div>
        <div className="menu-icon" onClick={handleMenuIconClick}>
          {/* Change the menu icon according to the click state. */}
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        {/* Change the way the menu is shown (different CSS) */}
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              to="/home"
              exact
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              exact
              className="nav-links"
              onClick={closeMobileMenu}
            >
              About us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/coupons"}
              exact
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Coupons
            </NavLink>
          </li>
          {window.innerWidth >= 1080 && (
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              Customer service
              {/* Dropdown icon */}
              <i className="fas fa-caret-down" />
              {/* If dropedown is true --> showcase Dropdown component */}
              {dropdown && <Dropdown />}
            </li>
          )}
          {window.innerWidth < 1080 &&
            sessionStorage.getItem("userType") === "ADMIN" &&
            store.getState().isLoggedIn &&
            AdminMenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    className="nav-links"
                    to={item.path}
                    // Closes the dropdown menu after clicking.
                    onClick={() => setClick(false)}
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          {window.innerWidth < 1080 &&
            sessionStorage.getItem("userType") === "COMPANY" &&
            store.getState().isLoggedIn &&
            CompanyMenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    className="nav-links"
                    to={item.path}
                    // Closes the dropdown menu after clicking.
                    onClick={() => setClick(false)}
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          {window.innerWidth < 1080 &&
            (sessionStorage.getItem("userType") === "CUSTOMER" ||
              !store.getState().isLoggedIn) &&
            CustomerMenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    className="nav-links"
                    to={item.path}
                    // Closes the dropdown menu after clicking.
                    onClick={() => setClick(false)}
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          <li>
            <NavLink
              to="/register"
              exact
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              exact
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Log In
            </NavLink>
          </li>
        </ul>
        <RegisterButton />
        {!store.getState().isLoggedIn && <LoginButton />}
        {store.getState().isLoggedIn && <LogOutButton />}
      </nav>
    </div>
  );
}

export default Navbar;

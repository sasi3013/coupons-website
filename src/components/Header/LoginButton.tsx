import React from "react";
import { NavLink } from "react-router-dom";
import "./Buttons.css";

export function LoginButton() {
    return(
        <NavLink to="/login">
            <button className="btn"> Log In</button>
        </NavLink>
    );
}
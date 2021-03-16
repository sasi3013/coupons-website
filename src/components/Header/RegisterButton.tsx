import React from "react";
import { NavLink } from "react-router-dom";
import "./Buttons.css";

export function RegisterButton() {
    return(
        <NavLink to="./register">
            <button className="btn"> Register</button>
        </NavLink>
    );
}
import axios from "axios";
import { NavLink } from "react-router-dom";
import { ActionType } from "../../redux/action-type";
import { store } from "../../redux/store";
import "./Buttons.css";

export function LogOutButton() {
  const logOut = async () => {
    try {
      await axios.post("http://localhost:8080/users/logout");
      store.dispatch({ type: ActionType.LogOut });
      sessionStorage.clear();
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <NavLink to="/home">
      <button className="btn" onClick={logOut}>
        Log Out
      </button>
    </NavLink>
  );
}

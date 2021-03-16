import axios from "axios";
import React, { ChangeEvent, Component } from "react";
import { UserLoginRequest } from "../../models/UserLoginRequest";
import { SuccessfulLoginDetails } from "../../models/SuccessfulLoginDetails";
import "./Login.css";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";

interface LoginState {
  userName: string;
  password: string;
}

export default class Login extends Component<any, LoginState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
  }

  private setUserName = (event: ChangeEvent<HTMLInputElement>) => {
    // args = אובייקט המכיל מידע בנוגע לארוע שהתרחש
    // args.target = אובייקט המתאר את הרכיב שהעלה את הארוע
    // args.target.value = של הרכיב שהעלה את הארוע value-זהו מאפיין ה
    const userName = event.target.value;
    this.setState({ userName });
  };

  private setPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    this.setState({ password });
  };

  private login = async () => {
    console.log("Entered Login");
    try {
      let userLoginRequest = new UserLoginRequest(
        this.state.userName,
        this.state.password
      );
      const response = await axios.post<SuccessfulLoginDetails>(
        "http://localhost:8080/users/login",
        userLoginRequest
      );
      const serverResponse = response.data;

      axios.defaults.headers.common["Authorization"] = serverResponse.token;
      if (serverResponse.userType === "ADMIN") {
        sessionStorage.setItem("userType", "ADMIN");
      } else if (serverResponse.userType === "CUSTOMER") {
        sessionStorage.setItem("userType", "CUSTOMER");
      } else {
        sessionStorage.setItem("userType", "COMPANY");
        sessionStorage.setItem("companyId", String(serverResponse.companyId));
      }
      sessionStorage.setItem("userId", String(serverResponse.userId));
      store.dispatch({ type: ActionType.Login, payload: serverResponse });
      this.props.history.push("/coupons");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
    console.log("Login ended");
  };

  public render() {
    return (
      <div className="login">
        <div>Log In </div>
        <br />
        <br />
        <input
          type="text"
          placeholder="User name"
          name="username"
          value={this.state.userName}
          onChange={this.setUserName}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.setPassword}
          required
        />
        <br />
        <input type="button" value="Login" onClick={this.login} />
      </div>
    );
  }
}

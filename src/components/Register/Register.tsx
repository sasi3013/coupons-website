import axios from "axios";
import React, { ChangeEvent, Component } from "react";
import "./Register.css";
import { User } from "../../models/User";

let userName: string;
let password: string;
let firstName: string;
let lastName: string;

export default class Register extends Component<any> {
  public constructor(props: any) {
    super(props);
  }

  private setUserName = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    userName = text;
  };

  private setPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    password = text;
  };

  private setFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    firstName = text;
  };

  private setLastName = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    lastName = text;
  };

  private register = async () => {
    try {
      let user = new User(userName, password, firstName, lastName);
      await axios.post("http://localhost:8080/users", user);
      alert("Registration complete :)");
      this.props.history.push("/home");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  public render() {
    return (
      <div className="register">
        <div>Sign up </div>
        <br />
        <br />
        <input
          type="text"
          placeholder="User name"
          name="username"
          value={userName}
          onChange={this.setUserName}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={this.setPassword}
        />
        <br />
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={firstName}
          onChange={this.setFirstName}
        />
        <br />
        <input
          type="text"
          placeholder="Last name"
          name="lastName"
          value={lastName}
          onChange={this.setLastName}
        />
        <br />
        <input type="button" value="Register" onClick={this.register} />
      </div>
    );
  }
}

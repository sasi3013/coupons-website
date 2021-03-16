import axios from "axios";
import React, { ChangeEvent, Component } from "react";
import "./AddUser.css";
import { User } from "../../models/User";

let userName: string;
let password: string;
let firstName: string;
let lastName: string;
let userType: string;
let companyId: number;

export default class AddUser extends Component<any> {
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

  private setUserType = (event: ChangeEvent<HTMLSelectElement>) => {
    const text = event.target.value;
    userType = text;
  };

  private setCompanyId = (event: ChangeEvent<HTMLInputElement>) => {
    const num = +event.target.value;
    companyId = num;
  };

  private addUser = async () => {
    try {
      let user = new User(
        userName,
        password,
        firstName,
        lastName,
        userType,
        companyId
      );
      await axios.post("http://localhost:8080/users", user);
      alert("A new user have been created :)");
      this.props.history.push("/users");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  public render() {
    return (
      <div className="add-user">
        <div>Create a new user </div>
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
        <input
          type="text"
          placeholder="Company ID"
          name="companyId"
          value={companyId}
          onChange={this.setCompanyId}
        />
        <br />
        <label>
          User Type : {"  "}
          <select value={userType} onChange={this.setUserType}>
            <option value=""> </option>
            <option value="ADMIN">Admin</option>
            <option value="COMPANY">Company</option>
          </select>
        </label>
        <br />
        <input type="button" value="Add User" onClick={this.addUser} />
      </div>
    );
  }
}

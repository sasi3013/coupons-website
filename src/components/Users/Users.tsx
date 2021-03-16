import React, { Component } from "react";
import "./Users.css";
import axios from "axios";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import { NavLink } from "react-router-dom";
import { User } from "../../models/User";

interface UsersState {
  users: User[];
  filterByUserName: string;
  filterByUserId: number;
  filterByCompanyId: number;
}

export default class Users extends Component<any, UsersState> {
  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      filterByUserName: "",
      filterByUserId: 0,
      filterByCompanyId: 0,
    };

    // subscribe() calls setState() <-- no parameter
    // the store coupons' data acts as a parameter
    // Bottom line - the callback is being called AFTER the store's state
    // changes (after the reduce function returns its value)
    this.unsubscribeStore = store.subscribe(
      // In fact, the following function is our "listener", "refresh function"
      () =>
        this.setState({
          users: store.getState().users,
        })
    );
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  public async componentDidMount() {
    const usersResponse = await axios.get<User[]>(
      "http://localhost:8080/users"
    );
    store.dispatch({
      type: ActionType.GetAllUsers,
      payload: usersResponse.data,
    });
  }

  public usersNamePipe = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.value;
    this.setState({ filterByUserName: name });
  };

  public usersIdPipe = (event: React.ChangeEvent<HTMLInputElement>) => {
    let userId = +event.target.value;
    this.setState({ filterByUserId: userId });
  };

  public usersCompanyIdPipe = (event: React.ChangeEvent<HTMLInputElement>) => {
    let companyId = +event.target.value;
    this.setState({ filterByCompanyId: companyId });
  };

  public render() {
    return (
      <div>
        {sessionStorage.getItem("userType") === "ADMIN" &&
          store.getState().isLoggedIn && (
            <NavLink to="./addUser">
              <input
                className="create-user"
                type="button"
                value="Create User"
              />
            </NavLink>
          )}
        <div className="users-search">
          <div>
            Search by name :<input type="text" onChange={this.usersNamePipe} />
          </div>
          <div>
            Search by user ID :
            <input type="number" onChange={this.usersIdPipe} />
          </div>
          <div>
            Search by company ID :
            <input type="number" onChange={this.usersCompanyIdPipe} />
          </div>
        </div>
        <br />
        <br />
        <div className="users">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>First name</th>
                <th>Last name</th>
                <th>User type</th>
                <th>Company ID</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users
                .filter((user) => {
                  if (this.state.filterByUserName === "") {
                    return true;
                  }
                  return user.userName
                    .toLowerCase()
                    .includes(this.state.filterByUserName.toLowerCase());
                })
                .filter((user) => {
                  if (this.state.filterByUserId === 0) {
                    return true;
                  }
                  return user.id === this.state.filterByUserId;
                })
                .filter((user) => {
                  if (this.state.filterByCompanyId === 0) {
                    return true;
                  }
                  return user.companyId === this.state.filterByCompanyId;
                })
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td className="users-table-link">
                      {" "}
                      <NavLink to={"/user/" + user.id}>
                        {user.userName}{" "}
                      </NavLink>
                    </td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.userType}</td>
                    <td>{user.companyId}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

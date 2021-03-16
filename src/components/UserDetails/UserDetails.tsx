import axios from "axios";
import { ChangeEvent, Component } from "react";
import { matchPath } from "react-router-dom";
import { User } from "../../models/User";
import "./UserDetails.css";

interface AccountState {
  user: User;
}

export default class UserDetails extends Component<any, AccountState> {
  constructor(props: any) {
    super(props);
    this.state = { user: null };
  }

  public async componentDidMount() {
    const id = matchPath("/account", this.props.location.pathname)
      ? sessionStorage.getItem("userId")
      : this.props.match.params.id;

    const response = await axios.get<User>("http://localhost:8080/users/" + id);
    this.setState({ user: response.data });
  }

  private setUserName = (event: ChangeEvent<HTMLInputElement>) => {
    const userName = event.target.value;
    const user = this.state.user;
    user.userName = userName;
    this.setState({ user });
  };

  private setPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    const user = this.state.user;
    user.password = password;
    this.setState({ user });
  };

  private setFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    const firstName = event.target.value;
    const user = this.state.user;
    user.firstName = firstName;
    this.setState({ user });
  };

  private setLastName = (event: ChangeEvent<HTMLInputElement>) => {
    const lastName = event.target.value;
    const user = this.state.user;
    user.lastName = lastName;
    this.setState({ user });
  };

  private editAccount = async () => {
    try {
      await axios.put("http://localhost:8080/users/", this.state.user);
      alert("Your account have been updated");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  private deleteAccount = async () => {
    try {
      const id = +sessionStorage.getItem("userId");
      await axios.delete("http://localhost:8080/users/" + id);
      alert("Your account have been deleted");
      this.props.history.push("/home");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  public render() {
    return (
      <div className="account">
        {this.state.user === null || (
          <p>
            <div className="account-header">Your information</div>
            <span>Username: </span>
            <input
              type="text"
              placeholder={this.state.user.userName}
              className="username"
              value={this.state.user.userName}
              onChange={this.setUserName}
            />
            <br />
            <br />
            <span>Password: </span>
            <input
              type="password"
              placeholder={this.state.user.password}
              className="password"
              value={this.state.user.password}
              onChange={this.setPassword}
            />
            <br />
            <br />
            <span>First name: </span>
            <input
              type="text"
              placeholder={this.state.user.firstName}
              className="firstName"
              value={this.state.user.firstName}
              onChange={this.setFirstName}
            />
            <br />
            <br />
            <span>Last name: </span>
            <input
              type="text"
              placeholder={this.state.user.lastName}
              className="lastName"
              value={this.state.user.lastName}
              onChange={this.setLastName}
            />
          </p>
        )}
        {this.state.user === null || (
          <div className="account-actions">
            <input
              className="edit-account"
              type="button"
              value="Edit Account"
              onClick={this.editAccount}
            />
            <input
              className="delete-account"
              type="button"
              value="Delete Account"
              onClick={this.deleteAccount}
            />
          </div>
        )}
        {this.state.user !== null || (
          <p className="account-not-loged-in">
            Please log in in order to view and edit your account details
          </p>
        )}
      </div>
    );
  }
}

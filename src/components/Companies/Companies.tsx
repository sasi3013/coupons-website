import React, { Component } from "react";
import "./Companies.css";
import axios from "axios";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import { NavLink } from "react-router-dom";
import { Company } from "../../models/Company";

interface CompaniesState {
  companies: Company[];
  filterByName: string;
  filterByCompanyId: number;
}

export default class Companies extends Component<any, CompaniesState> {
  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = {
      companies: [],
      filterByName: "",
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
          companies: store.getState().companies,
        })
    );
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  public async componentDidMount() {
    const companiesResponse = await axios.get<Company[]>(
      "http://localhost:8080/companies"
    );
    store.dispatch({
      type: ActionType.GetAllCompanies,
      payload: companiesResponse.data,
    });
  }

  public companiesNamePipe = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    console.log(text);
    this.setState({ filterByName: text });
  };

  public companiesIdPipe = (event: React.ChangeEvent<HTMLInputElement>) => {
    let num = +event.target.value;
    this.setState({ filterByCompanyId: num });
  };

  public render() {
    return (
      <div>
        {store.getState().successfulLoginDetails.userType === "ADMIN" &&
          store.getState().isLoggedIn && (
            <NavLink to="./addCompany">
              <input
                className="create-company"
                type="button"
                value="Create Company"
              />
            </NavLink>
          )}
        <div className="companies-search">
          <span>
            Search by name :
            <input type="text" onChange={this.companiesNamePipe} />
          </span>
          <span>
            Search by company ID :
            <input type="number" onChange={this.companiesIdPipe} />
          </span>
        </div>
        <br />
        <br />
        <div className="companies">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone number</th>
              </tr>
            </thead>
            <tbody>
              {this.state.companies
                .filter((company) => {
                  if (this.state.filterByName === "") {
                    return true;
                  }
                  return company.name
                    .toLowerCase()
                    .includes(this.state.filterByName.toLowerCase());
                })
                .filter((company) => {
                  if (this.state.filterByCompanyId === 0) {
                    return true;
                  }
                  return company.id === this.state.filterByCompanyId;
                })
                .map((company) => (
                  <tr key={company.id}>
                    <td>{company.id}</td>
                    <td className="companies-table-link">
                      {" "}
                      <NavLink to={"/company/" + company.id}>
                        {company.name}{" "}
                      </NavLink>
                    </td>
                    <td>{company.address}</td>
                    <td>{company.phoneNumber}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

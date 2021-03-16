import React, { Component } from "react";
import "./Coupons.css";
import { CouponBasicInfo } from "../../models/CouponBasicInfo";
import axios from "axios";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import { NavLink } from "react-router-dom";
import { Company } from "../../models/Company";
import CouponCard from "../CouponCard/CouponCard";
import { CategoryOptions } from "../../models/CategoryOptions";

interface CouponsState {
  coupons: CouponBasicInfo[];
  companies: Company[];
  companyOptions: {}[];
  categoryOptions: {}[];
  filterByName: string;
  filterByCouponId: number;
  filterByCategory: string;
  filterByCompany: string;
  filterByMaxPrice: number;
}

export default class Coupons extends Component<any, CouponsState> {
  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = {
      coupons: [],
      companies: [],
      companyOptions: [],
      categoryOptions: [],
      filterByName: "",
      filterByCouponId: 0,
      filterByCategory: "",
      filterByCompany: "",
      filterByMaxPrice: 0,
    };

    // subscribe() calls setState() <-- no parameter
    // the store coupons' data acts as a parameter
    // Bottom line - the callback is being called AFTER the store's state
    // changes (after the reduce function returns its value)
    this.unsubscribeStore = store.subscribe(
      // In fact, the following function is our "listener", "refresh function"
      () =>
        this.setState({
          coupons: store.getState().coupons,
          companies: store.getState().companies,
        })
    );
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  public async componentDidMount() {
    let couponsResponse;
    // User of a company will get only the coupons of his company. Admin and Customers will get all coupons.
    store.getState().isLoggedIn &&
    store.getState().successfulLoginDetails.userType === "COMPANY"
      ? (couponsResponse = await axios.get<CouponBasicInfo[]>(
          "http://localhost:8080/coupons/byCompanyId?companyId=" +
            store.getState().successfulLoginDetails.companyId
        ))
      : (couponsResponse = await axios.get<CouponBasicInfo[]>(
          "http://localhost:8080/coupons"
        ));

    store.dispatch({
      type: ActionType.GetAllCoupons,
      payload: couponsResponse.data,
    });

    // get all the companies for using in the filter.
    const companiesResponse = await axios.get<Company[]>(
      "http://localhost:8080/companies"
    );
    store.dispatch({
      type: ActionType.GetAllCompanies,
      payload: companiesResponse.data,
    });
  }

  public couponsNamePipe = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.value;
    this.setState({ filterByName: name });
  };

  public couponsIdPipe = (event: React.ChangeEvent<HTMLInputElement>) => {
    let num = +event.target.value;
    this.setState({ filterByCouponId: num });
  };

  public couponsMaxPricePipe = (event: React.ChangeEvent<HTMLInputElement>) => {
    let num = +event.target.value;
    this.setState({ filterByMaxPrice: num });
  };

  public couponsCategoryPipe = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let category = event.target.value;
    this.setState({ filterByCategory: category });
  };

  public companyPipe = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let company = event.target.value;
    this.setState({ filterByCompany: company });
  };

  public render() {
    return (
      <div>
        {store.getState().isLoggedIn &&
          store.getState().successfulLoginDetails.userType === "COMPANY" && (
            <NavLink to="./addCoupon">
              <input
                className="create-coupon"
                type="button"
                value="Create Coupon"
              />
            </NavLink>
          )}
        <div className="search-coupons">
          <div>
            Search by name :
            <input type="text" onChange={this.couponsNamePipe} />
          </div>
          {store.getState().isLoggedIn &&
            (sessionStorage.getItem("userType") === "COMPANY" ||
              sessionStorage.getItem("userType") === "ADMIN") && (
              <div>
                Search by coupon ID :
                <input type="number" onChange={this.couponsIdPipe} />
              </div>
            )}
          <div>
            Search by max price :
            <input type="number" onChange={this.couponsMaxPricePipe} />
          </div>
          <div>
            <label>
              Search by category :
              <select
                value={this.state.filterByCategory}
                onChange={this.couponsCategoryPipe}
              >
                {CategoryOptions.map((option) => (
                  <option key={option.index} value={option.value}>
                    {option.value}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Search by company :
              <select
                value={this.state.filterByCompany}
                onChange={this.companyPipe}
              >
                {this.state.companies.map((company) => (
                  <option key={company.id} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <br />
        <br />
        <div className="coupons">
          <div className="coupons-container">
            <div className="coupons-wrapper">
              <ul className="coupons-cards">
                {this.state.coupons
                  .filter((coupon) => {
                    if (this.state.filterByName === "") {
                      return true;
                    }
                    return coupon.name
                      .toLowerCase()
                      .includes(this.state.filterByName.toLowerCase());
                  })
                  .filter((coupon) => {
                    if (this.state.filterByCouponId === 0) {
                      return true;
                    }
                    return coupon.id === this.state.filterByCouponId;
                  })
                  .filter((coupon) => {
                    if (this.state.filterByCategory === "") {
                      return true;
                    }
                    return coupon.category.includes(
                      this.state.filterByCategory
                    );
                  })
                  .filter((coupon) => {
                    if (this.state.filterByCompany === "") {
                      return true;
                    }
                    return coupon.companyName.includes(
                      this.state.filterByCompany
                    );
                  })
                  .filter((coupon) => {
                    if (this.state.filterByMaxPrice === 0) {
                      return true;
                    }
                    return coupon.price <= this.state.filterByMaxPrice;
                  })
                  .map((coupon) => (
                    // <NavLink key={coupon.id} to={"/coupon/" + coupon.id}>
                    <CouponCard coupon={coupon} />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

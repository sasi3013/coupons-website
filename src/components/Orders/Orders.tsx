import React, { Component } from "react";
import "./Orders.css";
import axios from "axios";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import { PurchasedCoupon } from "../../models/PurchasedCoupon";
import { NavLink } from "react-router-dom";

interface OrdersState {
  purchases: PurchasedCoupon[];
  filterByCouponName: string;
  filterByPurchaseId: number;
  filterByUserId: number;
  filterByCouponId: number;
}

export default class Orders extends Component<any, OrdersState> {
  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = {
      purchases: [],
      filterByCouponName: "",
      filterByPurchaseId: 0,
      filterByUserId: 0,
      filterByCouponId: 0,
    };

    // subscribe() calls setState() <-- no parameter
    // the store coupons' data acts as a parameter
    // Bottom line - the callback is being called AFTER the store's state
    // changes (after the reduce function returns its value)
    this.unsubscribeStore = store.subscribe(
      // In fact, the following function is our "listener", "refresh function"
      () =>
        this.setState({
          purchases: store.getState().purchases,
        })
    );

    //let token = sessionStorage.getItem("userType");
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  public async componentDidMount() {
    this.getPurchases();
  }

  public async getPurchases() {
    const userId = sessionStorage.getItem("userId");
    const companyId = sessionStorage.getItem("companyId");
    let response;

    sessionStorage.getItem("userType") === "COMPANY"
      ? (response = await axios.get<PurchasedCoupon[]>(
          "http://localhost:8080/purchases/byCompanyId?companyId=" + companyId
        ))
      : sessionStorage.getItem("userType") === "ADMIN"
      ? (response = await axios.get<PurchasedCoupon[]>(
          "http://localhost:8080/purchases"
        ))
      : (response = await axios.get<PurchasedCoupon[]>(
          "http://localhost:8080/purchases/byUserId?userId=" + userId
        ));

    store.dispatch({
      type: ActionType.GetAllPurchases,
      payload: response.data,
    });
  }

  private async cancelOrder(id: number) {
    try {
      await axios.delete("http://localhost:8080/purchases/cancel/" + id);
      alert("The order have been canceled");
      this.getPurchases();
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  }

  public couponsNamePipe = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value;
    this.setState({ filterByCouponName: text });
  };

  public purchaseIdPipe = (event: React.ChangeEvent<HTMLInputElement>) => {
    let purchaseId = +event.target.value;
    this.setState({ filterByPurchaseId: purchaseId });
  };

  public userIdPipe = (event: React.ChangeEvent<HTMLInputElement>) => {
    let userId = +event.target.value;
    this.setState({ filterByUserId: userId });
  };

  public couponIdPipe = (event: React.ChangeEvent<HTMLInputElement>) => {
    let couponId = +event.target.value;
    this.setState({ filterByCouponId: couponId });
  };

  public render() {
    return (
      <div className="orders">
        <div className="orders-search">
          <div>
            Search by coupon's name :
            <input type="text" onChange={this.couponsNamePipe} />
          </div>
          <div>
            Search by purchase ID :
            <input type="number" onChange={this.purchaseIdPipe} />
          </div>
          {(sessionStorage.getItem("userType") === "ADMIN" ||
            sessionStorage.getItem("userType") === "COMPANY") && (
            <div>
              Search by user ID :
              <input type="number" onChange={this.userIdPipe} />
            </div>
          )}
          <div>
            Search by coupon ID :
            <input type="number" onChange={this.couponIdPipe} />
          </div>
          <br />
          <br />
        </div>
        {store.getState().isLoggedIn === false || (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Coupon Name</th>
                <th>Coupon description</th>
                <th>Company name</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {this.state.purchases
                .filter((purchase) => {
                  if (this.state.filterByCouponName === "") {
                    return true;
                  }
                  return purchase.couponName
                    .toLowerCase()
                    .includes(this.state.filterByCouponName.toLowerCase());
                })
                .filter((purchase) => {
                  if (this.state.filterByPurchaseId === 0) {
                    return true;
                  }
                  return purchase.id === this.state.filterByPurchaseId;
                })
                .filter((purchase) => {
                  if (this.state.filterByUserId === 0) {
                    return true;
                  }
                  return purchase.userId === this.state.filterByUserId;
                })
                .filter((purchase) => {
                  if (this.state.filterByCouponId === 0) {
                    return true;
                  }
                  return purchase.couponId === this.state.filterByCouponId;
                })
                .map((purchase) => (
                  <tr key={purchase.id}>
                    <td>{purchase.id}</td>
                    <td>{purchase.userId}</td>
                    <td className="orders-table-link">
                      <NavLink to={"/coupon/" + purchase.couponId}>
                        {purchase.couponName}{" "}
                      </NavLink>
                    </td>
                    <td>{purchase.couponDescription}</td>
                    <td>{purchase.companyName}</td>
                    <td>{purchase.price}</td>
                    <td>{purchase.amountPurchased}</td>
                    <td>{purchase.timestamp}</td>
                    <button
                      className="cancel-btn"
                      onClick={() => this.cancelOrder(purchase.id)}
                    >
                      Cancel
                    </button>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {store.getState().isLoggedIn !== false || (
          <p className="orders-not-loged-in">
            Please log in in order to view and edit your purchases
          </p>
        )}
      </div>
    );
  }
}

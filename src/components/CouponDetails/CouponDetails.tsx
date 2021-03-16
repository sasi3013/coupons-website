import axios from "axios";
import React, { Component } from "react";
import { ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import { CategoryOptions } from "../../models/CategoryOptions";
import { Coupon } from "../../models/Coupon";
import { PurchaseRequest } from "../../models/PurchaseRequest";
import "./CouponDetails.css";

interface CouponState {
  coupon: Coupon;
  amount: number;
}

export default class CouponDetails extends Component<any, CouponState> {
  constructor(props: any) {
    super(props);
    this.state = { coupon: null, amount: 1 };
  }

  public async componentDidMount() {
    const id = this.props.match.params.id;
    const response = await axios.get<Coupon>(
      "http://localhost:8080/coupons/" + id
    );
    this.setState({ coupon: response.data });
  }

  private setAmountToPurchase = (event: ChangeEvent<HTMLInputElement>) => {
    const amountToPurchase = +event.target.value;
    this.setState({ amount: amountToPurchase });
  };

  // Setting the changes of the coupon's details for updating coupon.
  private setName = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    let coupon = this.state.coupon;
    coupon.name = name;
    this.setState({ coupon });
  };

  private setPrice = (event: ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value;
    let coupon = this.state.coupon;
    coupon.price = +price;
    this.setState({ coupon });
  };

  private setDescription = (event: ChangeEvent<HTMLInputElement>) => {
    const description = event.target.value;
    let coupon = this.state.coupon;
    coupon.description = description;
    this.setState({ coupon });
  };

  private setStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    const startDate = new Date(event.target.value);
    let coupon = this.state.coupon;
    coupon.startDate = startDate;
    this.setState({ coupon });
  };

  private setEndDate = (event: ChangeEvent<HTMLInputElement>) => {
    const endDate = new Date(event.target.value);
    let coupon = this.state.coupon;
    coupon.endDate = endDate;
    this.setState({ coupon });
  };

  private setCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    let coupon = this.state.coupon;
    coupon.category = category;
    this.setState({ coupon });
  };

  private setCouponsAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const amount = +event.target.value;
    let coupon = this.state.coupon;
    coupon.amount = amount;
    this.setState({ coupon });
  };

  private setImage = (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.value;
    let coupon = this.state.coupon;
    coupon.image = image;
    this.setState({ coupon });
  };

  private purchase = async () => {
    try {
      const couponId = this.props.match.params.id;
      let purchaseRequest = new PurchaseRequest(couponId, this.state.amount);
      await axios.post("http://localhost:8080/purchases", purchaseRequest);
      alert("Purchase of " + this.state.amount + " items complete :)");
      this.props.history.push("/coupons");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  private deleteCoupon = async () => {
    try {
      const id = this.state.coupon.id;
      await axios.delete("http://localhost:8080/coupons/" + id);
      alert("The coupon have been deleted");
      this.props.history.push("/coupons");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  private updateCoupon = async () => {
    try {
      let coupon = this.state.coupon;
      await axios.put<Coupon>("http://localhost:8080/coupons", coupon);
      alert("Coupon have been updated :)");
      this.props.history.push("/coupons");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  public render() {
    return (
      <div className="coupon-details">
        <div className="coupons-details-header">Coupon's details</div>
        {this.state.coupon === null || (
          <div>
            {sessionStorage.getItem("userType") !== "COMPANY" ? (
              <p>
                <figure className="coupon-details-image">
                  <img
                    src={this.state.coupon.image}
                    alt="/images/defaultCoupon1.png"
                  />
                </figure>
                <br />
                <br />
                <span>Name: </span>
                {this.state.coupon.name}
                <br />
                <br />
                <span>Price: </span>${this.state.coupon.price}
                <br />
                <br />
                <span>Description: </span>
                {this.state.coupon.description}
                <br />
                <br />
                <span>End date: </span>
                {this.state.coupon.endDate}
                <br />
                <br />
                <span>Category: </span>
                {this.state.coupon.category}
                <br />
                <br />
                <span>Amount: </span>
                {this.state.coupon.amount}
                <br />
                <br />
                <span>Company: </span>
                {this.state.coupon.companyName}
              </p>
            ) : (
              <p className="update-coupon">
                <span>Name:</span>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={this.state.coupon.name}
                  onChange={this.setName}
                />
                <span>Price:</span>
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  value={this.state.coupon.price}
                  onChange={this.setPrice}
                />
                <span>Description:</span>
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={this.state.coupon.description}
                  onChange={this.setDescription}
                />
                <span>Amount:</span>
                <input
                  type="number"
                  placeholder="Amount"
                  name="amount"
                  value={this.state.coupon.amount}
                  onChange={this.setCouponsAmount}
                />
                <span>Start Date:</span>
                <input
                  type="date"
                  placeholder="Start Date"
                  name="startDate"
                  onChange={this.setStartDate}
                />
                <span>End Date:</span>
                <input
                  type="date"
                  placeholder="End Date"
                  name="end-date"
                  onChange={this.setEndDate}
                />
                <span>Image:</span>
                <input
                  type="text"
                  placeholder="Image"
                  name="image"
                  value={this.state.coupon.image}
                  onChange={this.setImage}
                />
                <span>Category:</span>
                <br />
                <select onChange={this.setCategory}>
                  {CategoryOptions.map((option) => (
                    <option
                      key={option.index}
                      value={this.state.coupon.category}
                    >
                      {option.value}
                    </option>
                  ))}
                </select>
              </p>
            )}
          </div>
        )}
        {sessionStorage.getItem("userType") !== "ADMIN" &&
        sessionStorage.getItem("userType") !== "COMPANY" ? (
          <div className="actions">
            Amount:
            <input
              type="number"
              placeholder="Amount"
              className="amount"
              value={this.state.amount}
              onChange={this.setAmountToPurchase}
              defaultValue="1"
            />
            <input
              className="action-button"
              type="button"
              value="Purchase"
              onClick={this.purchase}
            />
          </div>
        ) : (
          <div>
            {sessionStorage.getItem("userType") === "COMPANY" && (
              <NavLink to="./updateCoupon">
                <input
                  className="action-button"
                  type="button"
                  value="Update coupon"
                  onClick={this.updateCoupon}
                />
              </NavLink>
            )}
            <input
              className="action-button"
              type="button"
              value="Delete coupon"
              onClick={this.deleteCoupon}
            />
          </div>
        )}
      </div>
    );
  }
}

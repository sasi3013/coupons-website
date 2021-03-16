import axios from "axios";
import React from "react";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { CouponBasicInfo } from "../../models/CouponBasicInfo";
import { ActionType } from "../../redux/action-type";
import { store } from "../../redux/store";
import "./CouponCard.css";

interface CardProps {
  coupon: CouponBasicInfo;
}

export default class CouponCard extends Component<CardProps> {
  // To ignore useless constructor warning:
  // eslint-disable-next-line
  constructor(props: CardProps) {
    super(props);
  }

  private async deleteCoupon(id: number) {
    try {
      await axios.delete("http://localhost:8080/coupons/" + id);
      store.dispatch({ type: ActionType.DeleteCoupon , payload: id });
      alert("The coupon have been deleted");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  }

  public render() {
    return (
      <div>
        <li className="coupon-card">
          <NavLink
            className="coupon-card-link"
            to={"/coupon/" + this.props.coupon.id}
          >
            <figure
              className="coupon-card-image"
              data-category={this.props.coupon.category}
            >
              <img
                src={this.props.coupon.image}
                alt="/images/defaultCoupon1.png"
                className="coupon-card-img"
              />
            </figure>
            <div className="coupon-card-info">
              <h3 className="coupon-card-name">{this.props.coupon.name}</h3>
              <h5 className="coupon-card-text">
                <span>Price: </span>${this.props.coupon.price}
              </h5>
              <h5 className="coupon-card-text">
                <span>End Date: </span>
                {this.props.coupon.endDate}
              </h5>
              <h5 className="coupon-card-text">
                <span>Company: </span>
                {this.props.coupon.companyName}
              </h5>
            </div>
          </NavLink>
          {store.getState().isLoggedIn &&
            sessionStorage.getItem("userType") !== "CUSTOMER" && (
              <button
                className="delete-coupon-trash-button"
                onClick={() => this.deleteCoupon(this.props.coupon.id)}
              >
                <i className="fas fa-trash-alt"></i> Delete Coupon
              </button>
            )}
        </li>
      </div>
    );
  }
}

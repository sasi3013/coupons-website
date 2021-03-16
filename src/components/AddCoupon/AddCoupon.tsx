import axios from "axios";
import React, { ChangeEvent, Component } from "react";
import "./AddCoupon.css";
import { Coupon } from "../../models/Coupon";
import { CategoryOptions } from "../../models/CategoryOptions";

let name: string;
let price: string;
let description: string;
let startDate: Date;
let endDate: Date;
let category: string;
let amount: number;
let image: string;

export default class AddCoupon extends Component<any> {
  public constructor(props: any) {
    super(props);
  }

  private setName = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    name = text;
  };

  private setPrice = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    price = text;
  };

  private setDescription = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    description = text;
  };

  private setStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    startDate = date;
  };

  private setEndDate = (event: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    endDate = date;
  };

  private setCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    const text = event.target.value;
    category = text;
  };

  private setAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const num = +event.target.value;
    amount = num;
  };

  private setImage = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    image = text;
  };

  private addCoupon = async () => {
    try {
      let coupon = new Coupon(
        name,
        +price,
        description,
        endDate,
        category,
        amount,
        "",
        0,
        startDate,
        image
      );
      await axios.post<Coupon>("http://localhost:8080/coupons", coupon);
      alert("Coupon have been added :)");
      this.props.history.push("/coupons");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  public render() {
    return (
      <div className="add-coupon">
        <div>Create a new coupon </div>
        <br />
        <br />
        <span>Name:</span>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={this.setName}
        />
        <span>Price:</span>
        <input
          type="text"
          placeholder="Price"
          name="price"
          value={price}
          onChange={this.setPrice}
        />
        <span>Description:</span>
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={this.setDescription}
        />
        <span>Amount:</span>
        <input
          type="number"
          placeholder="Amount"
          name="amount"
          value={amount}
          onChange={this.setAmount}
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
          value={image}
          onChange={this.setImage}
        />
        <span>Category:</span>
        <br />
        <select onChange={this.setCategory}>
          {CategoryOptions.map((option) => (
            <option key={option.index} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        <br />
        <input
          className="add-coupon-button"
          type="button"
          value="Add Coupon"
          onClick={this.addCoupon}
        />
      </div>
    );
  }
}

import axios from "axios";
import React, { ChangeEvent, Component } from "react";
import "./AddCompany.css";
import { Company } from "../../models/Company";

let name: string;
let address: string;
let phoneNumber: string;

export default class AddCompany extends Component<any> {
  public constructor(props: any) {
    super(props);
  }

  private setName = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    name = text;
    console.log("name", name);
  };

  private setAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    address = text;
    console.log("address", address);
  };

  private setPhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    phoneNumber = text;
    console.log("phoneNumber", phoneNumber);
  };

  private addCompany = async () => {
    try {
      let company = new Company(name, address, phoneNumber);
      await axios.post("http://localhost:8080/companies", company);
      alert("A new company have been created :)");
      this.props.history.push("/companies");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  public render() {
    return (
      <div className="add-company">
        <div>Create a new company </div>
        <br />
        <br />
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={this.setName}
        />
        <br />
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={address}
          onChange={this.setAddress}
        />
        <br />
        <input
          type="text"
          placeholder="Phone number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={this.setPhoneNumber}
        />
        <br />
        <input type="button" value="Add Company" onClick={this.addCompany} />
      </div>
    );
  }
}

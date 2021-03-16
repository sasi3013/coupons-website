import React, { ChangeEvent, Component } from "react";
import "./ContactUs.css";

let name: string;
let email: string;
let message: string;

export default class About extends Component {
  private setName = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    name = text;
  };

  private setEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    email = text;
  };

  private setMessage = (event: { target: { value: any } }) => {
    const text = event.target.value;
    message = text;
  };

  private send = () => {
    alert("Thank you for your message!");
  };

  public render() {
    return (
      <div>
        <form className="contact-us">
          <div>Contact Us </div>
          <br />
          <br />
          <input
            name="name"
            value={name}
            placeholder="Name"
            type="text"
            onChange={this.setName}
            required
          />{" "}
          <br />
          <input
            name="email"
            value={email}
            placeholder="Email"
            type="email"
            onChange={this.setEmail}
            required
          />{" "}
          <br />
          <textarea
            name="message"
            id="message"
            value={message}
            placeholder="Message"
            onChange={this.setMessage}
            required
          ></textarea>{" "}
          <br />
          <input
            type="submit"
            value="SEND"
            className="submit"
            onClick={this.send}
          />
        </form>
      </div>
    );
  }
}

import axios from "axios";
import { Component } from "react";
import { ChangeEvent } from "react";
import { Company } from "../../models/Company";
import { store } from "../../redux/store";
import "./CompanyDetails.css";

interface CompanyState {
  company: Company;
}

export default class CompanyDetails extends Component<any, CompanyState> {
  constructor(props: any) {
    super(props);
    this.state = { company: null };
  }

  public async componentDidMount() {
    const id =
      sessionStorage.getItem("userType") === "COMPANY"
        ? sessionStorage.getItem("companyId")
        : this.props.match.params.id;
    const response = await axios.get<Company>(
      "http://localhost:8080/companies/" + id
    );
    this.setState({ company: response.data });
  }

  private setName = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    const company = this.state.company;
    company.name = name;
    this.setState({ company });
  };

  private setAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const address = event.target.value;
    const company = this.state.company;
    company.address = address;
    this.setState({ company });
  };

  private setPhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const phone = event.target.value;
    const company = this.state.company;
    company.phoneNumber = phone;
    this.setState({ company });
  };

  private editCompanyDetails = async () => {
    try {
      await axios.put("http://localhost:8080/companies/", this.state.company);
      alert("The company details have been updated");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  private deleteCompany = async () => {
    try {
      const id = this.props.match.params.id;
      await axios.delete("http://localhost:8080/companies/" + id);
      alert("The company have been deleted");
      this.props.history.push("/companies");
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  public render() {
    return (
      <div className="company-details">
        {this.state.company === null || (
          <p>
            <div className="company-details-header">Company information</div>
            <span>Name: </span>
            <input
              type="text"
              placeholder={this.state.company.name}
              className="name"
              value={this.state.company.name}
              onChange={this.setName}
            />
            <br />
            <br />
            <span>Address: </span>
            <input
              type="text"
              placeholder={this.state.company.address}
              className="address"
              value={this.state.company.address}
              onChange={this.setAddress}
            />
            <br />
            <br />
            <span>Phone number: </span>
            <input
              type="text"
              placeholder={this.state.company.phoneNumber}
              className="phone-number"
              value={this.state.company.phoneNumber}
              onChange={this.setPhoneNumber}
            />
          </p>
        )}
        {this.state.company === null || (
          <div className="company-details-actions">
            <input
              className="edit-company-info"
              type="button"
              value="Edit Company Information"
              onClick={this.editCompanyDetails}
            />
            {sessionStorage.getItem("userType") === "ADMIN" &&
              store.getState().isLoggedIn && (
                <input
                  className="delete-company"
                  type="button"
                  value="Delete Company"
                  onClick={this.deleteCompany}
                />
              )}
          </div>
        )}
        {this.state.company !== null || (
          <p className="account-not-loged-in">
            Please log in in order to view and edit your company details
          </p>
        )}
      </div>
    );
  }
}

import React, { Component } from "react";
import "./Layout.css";
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import About from "../About/About";
import Coupons from "../Coupons/Coupons";
import Login from "../Login/Login";
import ContactUs from "../ContactUs/ContactUs";
import Home from "../Home/Home";
import Help from "../Help/Help";
import CouponDetails from "../CouponDetails/CouponDetails";
import { store } from "../../redux/store";
import { Unsubscribe } from "redux";
import Register from "../Register/Register";
import Orders from "../Orders/Orders";
import Companies from "../Companies/Companies";
import Users from "../Users/Users";
import CompanyDetails from "../CompanyDetails/CompanyDetails";
import UserDetails from "../UserDetails/UserDetails";
import AddCoupon from "../AddCoupon/AddCoupon";
import AddCompany from "../AddCompany/AddCompany";
import AddUser from "../AddUser/AddUser";

interface LayoutState {
  isDarkMode: boolean;
}

export default class Layout extends Component<any, LayoutState> {
  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = { isDarkMode: false };

    this.unsubscribeStore = store.subscribe(
      () =>
        this.setState({
          isDarkMode: store.getState().isDarkMode,
        })
    );
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  public render() {
    return (
      <BrowserRouter>
        <section className="layout">
          <header>
            <Navbar />
          </header>

          <main
            className={
              store.getState().isDarkMode
                ? "dark-main-theme"
                : "light-main-theme"
            }
          >
            <Switch>
              <Route path="/about" component={About} exact />
              <Route path="/orders" component={Orders} exact />
              <Route path="/contactUs" component={ContactUs} exact />
              <Route path="/coupons" component={Coupons} exact />
              <Route path="/companies" component={Companies} exact />
              <Route path="/users" component={Users} exact />
              <Route path="/addCoupon" component={AddCoupon} exact />
              <Route path="/addCompany" component={AddCompany} exact />
              <Route path="/addUser" component={AddUser} exact />
              <Route path="/coupon/:id" component={CouponDetails} exact />
              <Route path="/company/:id" component={CompanyDetails} exact />
              <Route path="/user/:id" component={UserDetails} exact />
              <Route path="/account" component={UserDetails} exact />
              <Route path="/home" component={Home} exact />
              <Route path="/help" component={Help} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/register" component={Register} exact />
              <Redirect from="/" to="/home" exact />
              {/* <Route component={PageNotFound} /> */}
            </Switch>
          </main>

          <footer>
            <Footer />
          </footer>
        </section>
      </BrowserRouter>
    );
  }
}
